<script setup lang="ts">
const props = defineProps({
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
  autofocus: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel()

const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autofocus)
    input.value?.focus()
})
</script>

<template>
  <div>
    <BaseLabel>
      {{ label }}

      <input
        ref="input"
        v-model="model"
        class="block w-full px-4 py-3 text-sm border rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        :type="type"
        :name="name"
        :autofocus="(input && autofocus) || undefined"
        :required="required"
      >
    </BaseLabel>
  </div>
</template>
