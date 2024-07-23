import { fetchWithCache } from "../cache.ts";
import { GetIPFunction } from "./index.ts";

type GoogleCloudIpListResponse = {
  syncToken: string;
  creationTime: string;
  prefixes: {
    ipv4Prefix?: string;
    ipv6Prefix?: string;
  }[];
};

export const googleCloud: GetIPFunction = async () => {
  const googleCloudIpList = await fetchWithCache<GoogleCloudIpListResponse>(
    "googleCloud",
    "https://www.gstatic.com/ipranges/goog.json"
  );

  return {
    ipv4: googleCloudIpList.prefixes
      .filter((prefix) => prefix.ipv4Prefix)
      .map((prefix) => prefix.ipv4Prefix as string),
    ipv6: googleCloudIpList.prefixes
      .filter((prefix) => prefix.ipv6Prefix)
      .map((prefix) => prefix.ipv6Prefix as string),
  };
};
