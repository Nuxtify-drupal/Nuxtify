<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<{
      value: string
      label: string
    }[]>,
    required: true,
  },
})

defineEmits([
  'update:modelValue',
])

const model = defineModel()
</script>

<template>
  <select
    :id="id"
    v-model="model"
    :aria-label="label"
    class="bg-white dark:bg-stone-950"
  >
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :selected="model === option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>
