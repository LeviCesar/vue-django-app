type MaskitFunction = (value: string, mask: string, masked: boolean, tokens: Record<string, any>) => string;

export default function dynamicMask(
  maskit: MaskitFunction,
  masks: string[],
  tokens: Record<string, any>
): (value: string, mask: string | string[], masked?: boolean) => string {
  masks = masks.sort((a, b) => a.length - b.length);

  return function (value: string, mask: string | string[], masked: boolean = true): string {
    let i = 0;

    while (i < masks.length) {
      const currentMask = masks[i];
      i++;
      const nextMask = masks[i];
      
      if (maskit(value, nextMask, true, tokens).length >= maskit(value, currentMask, true, tokens).length) {
        return maskit(value, nextMask, masked, tokens);
      } else if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
        return maskit(value, currentMask, masked, tokens);
      }
    }

    return '';
  };
}
