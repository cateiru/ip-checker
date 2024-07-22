import { GetIPFunction } from "../check.ts";

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

export const getIp: GetIPFunction = async () => {
  const cloudFrontIpList: CloudflareIpListResponse = await (
    await fetch(CLOUDFLARE_IP_LIST)
  ).json();

  return {
    ipv4: cloudFrontIpList.result.ipv4_cidrs,
    ipv6: cloudFrontIpList.result.ipv6_cidrs,
  };
};
