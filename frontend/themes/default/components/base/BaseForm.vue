<script setup lang="ts">
defineProps({
  method: {
    type: String,
    default: 'GET',
  },
})

const emit = defineEmits([
  'submit',
])
</script>

<template>
  <form
    :method="method"
    class="flex flex-col w-full max-w-2xl gap-8 p-8 mx-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-stone-800 dark:border-stone-700 dark:shadow-stone-950"
    @submit.prevent="(e) => emit('submit', e)"
  >
    <slot />
  </form>
</template>
