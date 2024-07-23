import { parse } from "jsr:@std/csv";
import { GetIPFunction } from "../check.ts";

export const icloud: GetIPFunction = async () => {
  const res = await fetch("https://mask-api.icloud.com/egress-ip-ranges.csv");

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
