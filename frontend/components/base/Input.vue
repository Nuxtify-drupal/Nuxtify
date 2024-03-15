<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel()
</script>

<template>
  <div>
    <BaseLabel>
      {{ label }}

      <input
        v-model="model"
        class="block w-full px-4 py-3 text-sm border rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        :type="type"
        :name="name"
        :required="required"
      >
    </BaseLabel>
  </div>
</template>
