<script setup lang="ts">
import masker from "@/directives/mask/masker";
import token from "@/directives/mask/tokens";
import { PropType } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  id: {
    type: String,
  },
  class: {
    type: String,
  },
  value: {
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
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
  },
});

const inputAttrs = {
  type: props.type,
  id: props.id,
  class: props.class,
  required: props.required,
  placeholder: props.placeholder,
};

const emits = defineEmits<{
  (event: "input", value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (props.isMasked) {
    emits("input", target.value);
  } else {
    emits("input", masker(target.value, props.mask, false, token));
  }
};
</script>

<template>
  <input
    v-bind="inputAttrs"
    :value="value"
    v-mask="mask"
    @input="updateValue"
  />
</template>
