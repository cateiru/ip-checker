import { cloudflare } from "./services/cloudflare.ts";
import { cloudfront } from "./services/cloudfront.ts";
import { icloud } from "./services/icloud.ts";

export async function ipChecker(ipAddress: string) {
  await cloudfront(ipAddress);
  await icloud(ipAddress);
  await cloudflare(ipAddress);
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

  if (isExist) {
    console.log(`✅\t${serviceName} found.`);
  } else {
    console.log(`❌\t${serviceName} not found.`);
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
