import { parse } from "jsr:@std/csv";
import { GetIPFunction } from "../check.ts";

const ICLOUD_PRIVATE_RELAY_IP_LIST =
  "https://mask-api.icloud.com/egress-ip-ranges.csv";

export const getIp: GetIPFunction = async () => {
  const res = await fetch(ICLOUD_PRIVATE_RELAY_IP_LIST);

  const csv = parse(await res.text(), {
    skipFirstRow: false,
    columns: ["ip", "country", "locale", "city", ""],
  });
  const ipList = csv.map((row) => row.ip);

  return {
    ipv4: ipList,
    ipv6: [],
  };
};
