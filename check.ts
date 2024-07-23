import {
  colors,
  tty,
} from "https://deno.land/x/cliffy@v1.0.0-rc.4/ansi/mod.ts";
import { getIp as icloud } from "./services/icloud.ts";
import { getIp as cloudflare } from "./services/cloudflare.ts";
import { getIp as cloudfront } from "./services/cloudfront.ts";
import { getIp as fastly } from "./services/fastly.ts";
import { getIp as aws } from "./services/aws.ts";
import { getIp as googleCloud } from "./services/googleCloud.ts";
import { getIp as akamai } from "./services/akamai.ts";

export type GetIPFunction = () => Promise<IpList>;

type IpList = {
  ipv4: string[];
  ipv6: string[];
};

export async function ipChecker(ipAddress: string) {
  await check(ipAddress, "iCloud Private Relay", icloud);
  await check(ipAddress, "Cloudflare", cloudflare);
  await check(ipAddress, "Cloudfront", cloudfront);
  await check(ipAddress, "Fastly", fastly);
  await check(ipAddress, "AWS", aws);
  await check(ipAddress, "Google Cloud", googleCloud);
  await check(ipAddress, "Akamai", akamai);
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
  let isExist = false;

  for (const ip of ipList) {
    if (checkIpAddress(ipAddress, ip)) {
      isExist = true;
      break;
    }
  }

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
