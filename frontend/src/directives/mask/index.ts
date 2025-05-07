import masker from './masker';
import tokens from './tokens';

function createEvent(name: string): Event {
  const evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt;
}

interface MaskConfig {
  mask: string | string[];
  tokens: Record<string, any>;
}

const vMask = {
  beforeMount(el: HTMLElement, binding: { value: string | string[] | MaskConfig }) {
    let config: MaskConfig;

    if (Array.isArray(binding.value) || typeof binding.value === 'string') {
      config = {
        mask: binding.value,
        tokens: tokens
      };
    } else {
      config = binding.value;
    }

    if (el.tagName.toUpperCase() !== 'INPUT') {
      const els = el.getElementsByTagName('input');
      if (els.length !== 1) {
        throw new Error(`v-mask directive requires 1 input, found ${els.length}`);
      } else {
        el = els[0];
      }
    }

    const inputEl = el as HTMLInputElement;

    inputEl.oninput = function (evt: Event) {
      if (!(evt instanceof InputEvent) || !evt.isTrusted) return;

      let position = inputEl.selectionEnd ?? 0;
      const digit = inputEl.value.charAt(position - 1);
      inputEl.value = masker(inputEl.value, config.mask as string, true, config.tokens);

      while (position < inputEl.value.length && inputEl.value.charAt(position - 1) !== digit) {
        position++;
      }

      if (inputEl === document.activeElement) {
        inputEl.setSelectionRange(position, position);
        setTimeout(() => {
          inputEl.setSelectionRange(position, position);
        }, 0);
      }

      inputEl.dispatchEvent(createEvent('input'));
    };

    const newDisplay = masker(inputEl.value, config.mask as string, true, config.tokens);
    if (newDisplay !== inputEl.value) {
      inputEl.value = newDisplay;
      inputEl.dispatchEvent(createEvent('input'));
    }
  },

  updated(el: HTMLElement, binding: { value: string | string[] | MaskConfig }) {
    // Reapply the mask if the binding value changes
    const inputEl = el as HTMLInputElement;
    const config: MaskConfig = {
      mask: binding.value as string | string[],
      tokens: tokens
    };

    const newDisplay = masker(inputEl.value, config.mask as string, true, config.tokens);
    if (newDisplay !== inputEl.value) {
      inputEl.value = newDisplay;
      inputEl.dispatchEvent(createEvent('input'));
    }
  }
};

export default vMask;
