import { fetchWithCache } from "../cache.ts";
import { GetIPFunction } from "./index.ts";

type CloudFrontIpListResponse = {
  CLOUDFRONT_GLOBAL_IP_LIST: string[];
};

export const cloudfront: GetIPFunction = async () => {
  const cloudFrontIpList = await fetchWithCache<CloudFrontIpListResponse>(
    "cloudfront",
    "https://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips"
  );

  return {
    ipv4: cloudFrontIpList.CLOUDFRONT_GLOBAL_IP_LIST,
    ipv6: [],
  };
};
