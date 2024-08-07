import { GetIPFunction } from "./index.ts";

// ref. https://techdocs.akamai.com/origin-ip-acl/docs/update-your-origin-server
const AKAMAI_IP_V4_LIST = [
  "2.16.0.0/13",
  "23.0.0.0/12",
  "23.192.0.0/11",
  "23.32.0.0/11",
  "23.64.0.0/14",
  "23.72.0.0/13",
  "69.192.0.0/16",
  "72.246.0.0/15",
  "88.221.0.0/16",
  "92.122.0.0/15",
  "95.100.0.0/15",
  "96.16.0.0/15",
  "96.6.0.0/15",
  "104.64.0.0/10",
  "118.214.0.0/16",
  "173.222.0.0/15",
  "184.24.0.0/13",
  "184.50.0.0/15",
  "184.84.0.0/14",
];

export const akamai: GetIPFunction = () => {
  return {
    ipv4: AKAMAI_IP_V4_LIST,
    ipv6: [], // TODO: support IPv6
  };
};
