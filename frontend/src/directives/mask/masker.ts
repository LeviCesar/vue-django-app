import maskit from "./maskit.ts";
import dynamicMask from "./dynamicMask.ts";

interface Tokens {
  [key: string]: any;
}

export default function (
  value: string,
  mask: string | string[],
  masked: boolean = true,
  tokens: Tokens
) {
  return Array.isArray(mask)
    ? dynamicMask(maskit, mask, tokens)(value, mask, masked)
    : maskit(value, mask, masked, tokens);
}
