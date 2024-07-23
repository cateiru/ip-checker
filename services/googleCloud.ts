import { GetIPFunction } from "../check.ts";

const GOOGLE_CLOUD_IP_LIST = "https://www.gstatic.com/ipranges/goog.json";

type GoogleCloudIpListResponse = {
  syncToken: string;
  creationTime: string;
  prefixes: {
    ipv4Prefix?: string;
    ipv6Prefix?: string;
  }[];
};

export const getIp: GetIPFunction = async () => {
  const googleCloudIpList: GoogleCloudIpListResponse = await (
    await fetch(GOOGLE_CLOUD_IP_LIST)
  ).json();

  return {
    ipv4: googleCloudIpList.prefixes
      .filter((prefix) => prefix.ipv4Prefix)
      .map((prefix) => prefix.ipv4Prefix as string),
    ipv6: googleCloudIpList.prefixes
      .filter((prefix) => prefix.ipv6Prefix)
      .map((prefix) => prefix.ipv6Prefix as string),
  };
};
