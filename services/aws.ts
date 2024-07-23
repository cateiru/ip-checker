import { fetchWithCache } from "../cache.ts";
import { GetIPFunction } from "./index.ts";

type AWSIpListResponse = {
  syncToken: string;
  createDate: string;
  prefixes: {
    ip_prefix: string;
    region: string;
    service: string;
    network_border_group: string;
  }[];
  ipv6_prefixes: {
    ipv6_prefix: string;
    region: string;
    service: string;
    network_border_group: string;
  }[];
};

export const aws: GetIPFunction = async () => {
  const awsIpList = await fetchWithCache<AWSIpListResponse>(
    "aws",
    "https://ip-ranges.amazonaws.com/ip-ranges.json"
  );

  return {
    ipv4: awsIpList.prefixes.map((prefix) => prefix.ip_prefix),
    ipv6: [], // TODO: support IPv6
  };
};
