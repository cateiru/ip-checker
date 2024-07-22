# IP Address Checker

This is a tool that allows you to find out which service an IP address belongs to.

## Usage

- Install [Deno](https://deno.land/)

```bash
deno run https://raw.githubusercontent.com/cateiru/ip-checker/main/main.ts
```

```text
$ deno run https://raw.githubusercontent.com/cateiru/ip-checker/main/main.ts

? Enter check IP address: › 192.168.0.1
? Check IP address: 192.168.0.1? (y/n) › Yes
Checking IP address: 192.16
❌	iCloud not found.
❌	Cloudflare not found.
❌	Cloudfront not found.
❌	Fastly not found.
```

```text
✅ Granted all net access.

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
