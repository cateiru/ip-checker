# IP Address Checker

This is a tool that allows you to find out which service an IP address belongs to.

## Usage

- Install [Deno](https://deno.land/)

```bash
deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/cateiru/ip-checker/4b000d99e49c51e85b8f22757b26474d9b225e10/main.ts
```

```text
$ deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/cateiru/ip-checker/4b000d99e49c51e85b8f22757b26474d9b225e10/main.ts

? Enter check IP address: › 172.64.0.1
? Check IP address: 172.64.0.1? (y/n) › Yes
Checking IP address: 172.64.0.1 ...

❌  iCloud Private Relay not found.
✅  Cloudflare found.
❌  Cloudfront not found.
❌  Fastly not found.
❌  AWS not found.
❌  Google Cloud not found.
❌  Akamai not found.
```

```text
$ deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/cateiru/ip-checker/4b000d99e49c51e85b8f22757b26474d9b225e10/main.ts --help

Usage:   IP-CHECKER
Version: 1.0.0

Description:

  A simple CLI tool to check your IP address.

Options:

  -h, --help                  - Show this help.
  -V, --version               - Show the version number for this program.
  -i, --ip       <IPAddress>  - IP address to check
  -y, --yes                   - Skip confirmation
```

## LICENSE

[MIT](./LICENSE)
