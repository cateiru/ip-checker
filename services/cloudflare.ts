import { checkIpAddresses } from "../check.ts";

const CLOUDFLARE_IP_LIST = "https://api.cloudflare.com/client/v4/ips";

type CloudflareIpListResponse = {
  result: {
    ipv4_cidrs: string[];
    ipv6_cidrs: string[];
    etag: string;
  };
  success: boolean;
  errors: any[];
  messages: any[];
};

export async function cloudflare(ipAddress: string) {
  const cloudFrontIpList: CloudflareIpListResponse = await (
    await fetch(CLOUDFLARE_IP_LIST)
  ).json();

  // TODO: Check IPv6
  checkIpAddresses("CloudFront", ipAddress, cloudFrontIpList.result.ipv4_cidrs);
}
