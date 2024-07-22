import {
  Command,
  ArgumentValue,
  ValidationError,
} from "https://deno.land/x/cliffy@v1.0.0-rc.4/command/mod.ts";
import {
  Input,
  Confirm,
} from "https://deno.land/x/cliffy@v1.0.0-rc.4/prompt/mod.ts";

const NAME = "IP-CHECKER";
const VERSION = "1.0.0";
const DESCRIPTION = "A simple CLI tool to check your IP address.";

const IP_V4_REGEXP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
const IP_V6_REGEXP = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

async function main() {
  const command = await new Command()
    .name(NAME)
    .version(VERSION)
    .description(DESCRIPTION)
    .type("ip", ipAddressType)
    .option("-i, --ip <IPAddress:ip>", "IP address to check")
    .option("-y, --yes", "Skip confirmation")
    .parse(Deno.args);

  // If the IP address is not provided, prompt the user to enter it.
  let ipAddress = command.options.ip;
  if (typeof ipAddress === "undefined") {
    let promptText = "Enter check IP address:";
    while (
      !(
        typeof ipAddress !== "undefined" &&
        (IP_V4_REGEXP.test(ipAddress) || IP_V6_REGEXP.test(ipAddress))
      )
    ) {
      ipAddress = await Input.prompt({
        message: promptText,
      });
      // overwrite next prompt text
      promptText = "Invalid IP address. Please enter a valid IP address:";
    }
  }

  // confirm
  const confirmed =
    typeof command.options.yes !== "undefined" ||
    (await Confirm.prompt(`Check IP address: ${ipAddress}?`));

  if (confirmed) {
    await ipChecker(ipAddress);
  }
}

/**
 * validate IP address
 */
function ipAddressType({ value }: ArgumentValue): string {
  if (!IP_V4_REGEXP.test(value) && !IP_V6_REGEXP.test(value)) {
    throw new ValidationError(`"${value}" is not a valid IP address.`);
  }
  return value;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  void main();
}
