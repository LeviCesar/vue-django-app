interface Masker {
  pattern: RegExp;
  transform?: (char: string) => string;
  escape?: boolean;
}

interface Tokens {
  [key: string]: Masker;
}

export default function maskit(
  value: string,
  mask: string,
  masked: boolean = true,
  tokens: Tokens
): string {
  value = value || "";
  mask = mask || "";
  let iMask = 0;
  let iValue = 0;
  let output = "";

  while (iMask < mask.length && iValue < value.length) {
    let cMask = mask[iMask];
    const masker = tokens[cMask];
    const cValue = value[iValue];

    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++;
        cMask = mask[iMask];
      }
      if (masked) output += cMask;
      if (cValue === cMask) iValue++;
      iMask++;
    }
  }

  let restOutput = "";
  while (iMask < mask.length && masked) {
    const cMask = mask[iMask];
    if (tokens[cMask]) {
      restOutput = "";
      break;
    }
    restOutput += cMask;
    iMask++;
  }

  return output + restOutput;
}
