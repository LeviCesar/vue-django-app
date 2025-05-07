<script setup lang="ts">
import { ref } from "vue";

defineProps({
  inputId: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [Number, String, Date],
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const viewPassword = ref(false);
const toggleView = () => {
  viewPassword.value = !viewPassword.value;
};

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div
    class="w-full flex items-center border border-indigo-600/30 rounded-full bg-white"
  >
    <font-awesome-icon icon="lock" class="w-6 py-2 px-4 text-indigo-600" />
    <input
      :type="viewPassword ? 'text' : 'password'"
      :id="inputId"
      :placeholder="inputPlaceholder"
      :value="modelValue"
      @input="updateValue"
      class="w-full p-2 border-0 outline-0 rounded-md focus:ring-2 focus:ring-indigo-600 ring-inset"
    />
    <font-awesome-icon
      @click="toggleView"
      :icon="viewPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']"
      class="py-2 px-4 cursor-pointer text-indigo-600"
    />
  </div>
</template>
