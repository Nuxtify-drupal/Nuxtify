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
  <select
    :id="id"
    v-model="model"
    :aria-label="label"
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
</template>
