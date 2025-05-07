<script setup lang="ts">
defineProps({
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
    default: 'text',
  },
  inputId: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [Number, String, Date],
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div
    :class="[
    'w-full',
    'flex items-center',
    'border border-indigo-600/30 rounded-full ',
    'bg-white',
    ]"
  >
    <font-awesome-icon :icon="icon" class="w-6 py-2 px-4 text-indigo-600" />
    <input
    :type="inputType"
    :id="inputId"
    :placeholder="inputPlaceholder"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :class="[
      'w-full',
      'p-2',
      'rounded-r-full border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset'
    ]"
    />
  </div>
</template>
