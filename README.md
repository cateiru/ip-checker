# IP Address Checker

This is a tool that allows you to find out which service an IP address belongs to.

## Usage

- Install [Deno](https://deno.land/)

```bash
deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/cateiru/ip-checker/v1.2.0/main.ts
```

```text
$ deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/cateiru/ip-checker/v1.2.0/main.ts

? Enter check IP address: › 172.64.0.1
? Check IP address: 172.64.0.1? (y/n) › Yes
❌  iCloud Private Relay not found.
✅  Cloudflare found.
❌  CloudFront not found.
❌  Fastly not found.
❌  AWS not found.
❌  Google Cloud not found.
❌  Akamai not found.
```

- permissions
  - `net`: Make requests to the IP Range API.
  - `read`, `write`: Save the IP Range API response to a file. cache files `.ip_checker_cache/*.json` is saved in the current directory.

### Help

```text
$ deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/cateiru/ip-checker/v1.2.0/main.ts --help

Usage:   IP-CHECKER
Version: 1.1.0

Description:

  A simple CLI tool to check your IP address.

Options:

  -h, --help                  - Show this help.
  -V, --version               - Show the version number for this program.
  -i, --ip       <IPAddress>  - IP address to check
  -y, --yes                   - Skip confirmation
  -j, --json                  - Output as JSON
```

### Export json example

```bash
$ deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/cateiru/ip-checker/v1.2.0/main.ts --ip 172.64.0.1 --yes --json | jq

{
  "iCloud Private Relay": false,
  "Cloudflare": true,
  "CloudFront": false,
  "Fastly": false,
  "AWS": false,
  "Google Cloud": false,
  "Akamai": false
}
```

## LICENSE

[MIT](./LICENSE)
