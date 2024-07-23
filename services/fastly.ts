import { GetIPFunction } from "../check.ts";

type FastlyIpLitResponse = {
  addresses: string[];
  ipv6_addresses: string[];
};

export const fastly: GetIPFunction = async () => {
  const fastlyIpList: FastlyIpLitResponse = await (
    await fetch("https://api.fastly.com/public-ip-list")
  ).json();

  return {
    ipv4: fastlyIpList.addresses,
    ipv6: fastlyIpList.ipv6_addresses,
  };
};
