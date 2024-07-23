import { GetIPFunction } from "../check.ts";

type GoogleCloudIpListResponse = {
  syncToken: string;
  creationTime: string;
  prefixes: {
    ipv4Prefix?: string;
    ipv6Prefix?: string;
  }[];
};

export const googleCloud: GetIPFunction = async () => {
  const googleCloudIpList: GoogleCloudIpListResponse = await (
    await fetch("https://www.gstatic.com/ipranges/goog.json")
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
