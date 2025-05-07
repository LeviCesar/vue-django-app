<script setup lang="ts">
import masker from "@/directives/mask/masker";
import token from "@/directives/mask/tokens";
import { PropType } from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    default: "text",
  },
  inputId: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [Number, String, Date],
    required: true,
  },
  mask: {
    type: [String, Array] as PropType<string | string[]>,
    default: "",
    required: true,
  },
  isMasked: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const inputAttrs = {
  type: props.inputType,
  id: props.inputId,
  placeholder: props.inputPlaceholder,
};

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const rawValue = target.value;

  const finalValue = props.isMasked
    ? rawValue
    : masker(rawValue, props.mask, false, token);

  emit("update:modelValue", finalValue);
};
</script>

<template>
  <div
    :class="[
      'w-full',
      'flex items-center',
      'border border-indigo-600/30 rounded-full',
      'bg-white',
    ]"
  >
    <font-awesome-icon :icon="icon" class="w-6 py-2 px-4 text-indigo-600" />
    <input
      v-bind="inputAttrs"
      v-mask="mask"
      :value="modelValue"
      @input="updateValue"
      :class="[
        'w-full',
        'p-2',
        'rounded-r-full border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset',
      ]"
    />
  </div>
</template>