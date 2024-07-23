import { GetIPFunction } from "../check.ts";

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
  const awsIpList: AWSIpListResponse = await (
    await fetch("https://ip-ranges.amazonaws.com/ip-ranges.json")
  ).json();

  return {
    ipv4: awsIpList.prefixes.map((prefix) => prefix.ip_prefix),
    ipv6: [], // TODO: support IPv6
  };
};
