import { icloud } from "./icloud.ts";
import { cloudflare } from "./cloudflare.ts";
import { cloudfront } from "./cloudfront.ts";
import { fastly } from "./fastly.ts";
import { aws } from "./aws.ts";
import { googleCloud } from "./googleCloud.ts";
import { akamai } from "./akamai.ts";

export type GetIPFunction = () => Promise<IpList> | IpList;
type IpList = {
  ipv4: string[];
  ipv6: string[];
};

export const ServiceMap: { [serviceName: string]: GetIPFunction } = {
  "iCloud Private Relay": icloud,
  Cloudflare: cloudflare,
  CloudFront: cloudfront,
  Fastly: fastly,
  AWS: aws,
  "Google Cloud": googleCloud,
  Akamai: akamai,
};
