import { parse } from "jsr:@std/csv";
import { GetIPFunction } from "./index.ts";
import { fetchWithCache } from "../cache.ts";

export const icloud: GetIPFunction = async () => {
  const text = await fetchWithCache(
    "icloud",
    "https://mask-api.icloud.com/egress-ip-ranges.csv",
    undefined,
    true
  );

  const csv = parse(text, {
    skipFirstRow: false,
    columns: ["ip", "country", "locale", "city", ""],
  });
  const ipList = csv.map((row) => row.ip);

  return {
    ipv4: ipList,
    ipv6: [],
  };
};
