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
    type: Object as PropType<{
      key: string
      options: {
        value: string
        label: string
      }[]
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
      class="px-2 py-1 bg-white rounded-lg appearance-none pe-6 dark:bg-stone-950"
    >
      <optgroup
        v-for="optgroup of options"
        :key="optgroup.key"
        :label="optgroup.key"
      >
        <option
          v-for="option in optgroup.options"
          :key="option.value"
          :value="option.value"
          :selected="model === option.value"
        >
          {{ option.label }}
        </option>
      </optgroup>
    </select>

    <Icon
      name="mdi:chevron-up-down"
      class="absolute w-4 h-4 end-1"
    />
  </div>
</template>
