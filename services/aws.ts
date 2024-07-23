import { GetIPFunction } from "../check.ts";

const AWS_IP_LIST = "https://ip-ranges.amazonaws.com/ip-ranges.json";

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

export const getIp: GetIPFunction = async () => {
  const awsIpList: AWSIpListResponse = await (await fetch(AWS_IP_LIST)).json();

  return {
    ipv4: awsIpList.prefixes.map((prefix) => prefix.ip_prefix),
    ipv6: [], // TODO: support IPv6
  };
};
