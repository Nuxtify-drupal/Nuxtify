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
  <div
    class="relative flex items-center"
  >
    <select
      :id="id"
      v-model="model"
      :aria-label="label"
      class="px-2 py-1 pr-6 bg-white rounded-lg appearance-none dark:bg-stone-950"
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

    <Icon
      name="mdi:chevron-up-down"
      class="absolute w-4 h-4 right-1"
    />
  </div>
</template>
