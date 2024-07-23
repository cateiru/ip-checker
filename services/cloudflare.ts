import { GetIPFunction } from "../check.ts";

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

export const cloudflare: GetIPFunction = async () => {
  const cloudFrontIpList: CloudflareIpListResponse = await (
    await fetch("https://api.cloudflare.com/client/v4/ips")
  ).json();

  return {
    ipv4: cloudFrontIpList.result.ipv4_cidrs,
    ipv6: cloudFrontIpList.result.ipv6_cidrs,
  };
};
