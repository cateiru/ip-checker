import { GetIPFunction } from "../check.ts";

const CLOUDFRONT_IP_LIST =
  "https://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips";

type CloudFrontIpListResponse = {
  CLOUDFRONT_GLOBAL_IP_LIST: string[];
};

export const getIp: GetIPFunction = async () => {
  const cloudFrontIpList: CloudFrontIpListResponse = await (
    await fetch(CLOUDFRONT_IP_LIST)
  ).json();

  return {
    ipv4: cloudFrontIpList.CLOUDFRONT_GLOBAL_IP_LIST,
    ipv6: [],
  };
};
