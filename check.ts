import {
  colors,
  tty,
} from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/mod.ts";

import { GetIPFunction, ServiceMap } from "./services/index.ts";

export async function ipChecker(ipAddress: string) {
  for (const [serviceName, func] of Object.entries(ServiceMap)) {
    await check(ipAddress, serviceName, func);
  }
}

export async function check(
  ipAddress: string,
  serviceName: string,
  func: GetIPFunction
) {
  const report = colors.bold.green;

  Deno.stdout.writeSync(
    new TextEncoder().encode(report(`⏳  Checking ${serviceName} ...`))
  );

  const { ipv4 } = await func();

  checkIpAddresses(serviceName, ipAddress, ipv4);
}

export function checkIpAddresses(
  serviceName: string,
  ipAddress: string,
  ipList: string[]
) {
  const isExist = ipList.some((ip) => checkIpAddress(ipAddress, ip));

  tty.cursorLeft.eraseLine();

  const serviceNameColor = colors.bold.blue;

  if (isExist) {
    console.log(`✅  ${serviceNameColor(serviceName)} found.`);
  } else {
    console.log(`❌  ${serviceNameColor(serviceName)} not found.`);
  }
}

function checkIpAddress(ip: string, currentIp: string) {
  const [current, mask] = currentIp.split("/");

  if (typeof mask === "undefined") {
    return ip === current;
  }

  const currentIpNum = ipToNumber(current);
  const maskNum = parseInt(mask, 10);
  const ipNum = ipToNumber(ip);
  return ipNum >> (32 - maskNum) === currentIpNum >> (32 - maskNum);
}

// convert IP address to number
function ipToNumber(ip: string) {
  return ip.split(".").reduce((acc, octet, i) => {
    return acc + parseInt(octet, 10) * Math.pow(256, 3 - i);
  }, 0);
}
