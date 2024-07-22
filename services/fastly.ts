import { GetIPFunction } from "../check.ts";

const FASTLY_IP_LIST = "https://api.fastly.com/public-ip-list";

type FastlyIpLitResponse = {
  addresses: string[];
  ipv6_addresses: string[];
};

export const getIp: GetIPFunction = async () => {
  const fastlyIpList: FastlyIpLitResponse = await (
    await fetch(FASTLY_IP_LIST)
  ).json();

  return {
    ipv4: fastlyIpList.addresses,
    ipv6: fastlyIpList.ipv6_addresses,
  };
};
