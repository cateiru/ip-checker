import { GetIPFunction } from "../check.ts";

type CloudFrontIpListResponse = {
  CLOUDFRONT_GLOBAL_IP_LIST: string[];
};

export const cloudfront: GetIPFunction = async () => {
  const cloudFrontIpList: CloudFrontIpListResponse = await (
    await fetch(
      "https://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips"
    )
  ).json();

  return {
    ipv4: cloudFrontIpList.CLOUDFRONT_GLOBAL_IP_LIST,
    ipv6: [],
  };
};
