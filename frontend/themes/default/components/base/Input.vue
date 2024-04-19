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
  autocapitalize: {
    type: String,
    default: undefined,
  },
  autocorrect: {
    type: String,
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: undefined,
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

const id = useId()
const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autofocus)
    input.value?.focus()
})
</script>

<template>
  <div>
    <BaseLabel
      :for="id"
      class="mb-2 -mt-2"
    >
      {{ label }}
    </BaseLabel>

    <input
      :id="id"
      ref="input"
      v-model="model"
      class="block w-full px-4 py-3 text-sm transition-all border rounded-lg dark:bg-stone-900 dark:border-stone-700 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none outline outline-transparent focus:outline-blue-500 focus:shadow-lg"
      :type="type"
      :name="name"
      :autocapitalize="autocapitalize || undefined"
      :autocorrect="autocorrect || undefined"
      :autocomplete="autocomplete || undefined"
      :autofocus="(input && autofocus) || undefined"
      :required="required"
    >
  </div>
</template>
