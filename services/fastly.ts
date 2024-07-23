import { fetchWithCache } from "../cache.ts";
import { GetIPFunction } from "./index.ts";

type FastlyIpLitResponse = {
  addresses: string[];
  ipv6_addresses: string[];
};

export const fastly: GetIPFunction = async () => {
  const fastlyIpList = await fetchWithCache<FastlyIpLitResponse>(
    "fastly",
    "https://api.fastly.com/public-ip-list"
  );

  return {
    ipv4: fastlyIpList.addresses,
    ipv6: fastlyIpList.ipv6_addresses,
  };
};
