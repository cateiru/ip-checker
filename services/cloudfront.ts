import { checkIpAddresses } from "../check.ts";

const CLOUDFRONT_IP_List =
  "https://d7uri8nf7uskq.cloudfront.net/tools/list-cloudfront-ips";

type CloudFrontIpListResponse = {
  CLOUDFRONT_GLOBAL_IP_LIST: string[];
};

export async function cloudfront(ipAddress: string) {
  const cloudFrontIpList: CloudFrontIpListResponse = await (
    await fetch(CLOUDFRONT_IP_List)
  ).json();

  checkIpAddresses(
    "CloudFront",
    ipAddress,
    cloudFrontIpList.CLOUDFRONT_GLOBAL_IP_LIST
  );
}
