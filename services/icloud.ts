import { parse } from "jsr:@std/csv";
import { checkIpAddresses } from "../check.ts";

const ICLOUD_PRIVATE_RELAY_IP_LIST =
  "https://mask-api.icloud.com/egress-ip-ranges.csv";

export async function icloud(ipAddress: string) {
  const res = await fetch(ICLOUD_PRIVATE_RELAY_IP_LIST);

  const csv = parse(await res.text(), {
    skipFirstRow: false,
    columns: ["ip", "country", "locale", "city", ""],
  });
  const ipList = csv.map((row) => row.ip);

  checkIpAddresses("iCloud Private Relay", ipAddress, ipList);
}
