import { fetchWithCache } from "../cache.ts";
import { GetIPFunction } from "./index.ts";

type CloudflareIpListResponse = {
  result: {
    ipv4_cidrs: string[];
    ipv6_cidrs: string[];
    etag: string;
  };
  success: boolean;
  errors: unknown[];
  messages: unknown[];
};

export const cloudflare: GetIPFunction = async () => {
  const cloudFrontIpList = await fetchWithCache<CloudflareIpListResponse>(
    "cloudflare",
    "https://api.cloudflare.com/client/v4/ips"
  );

  return {
    ipv4: cloudFrontIpList.result.ipv4_cidrs,
    ipv6: cloudFrontIpList.result.ipv6_cidrs,
  };
};
