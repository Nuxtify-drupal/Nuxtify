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
    class="flex flex-col w-full max-w-2xl gap-8 p-8 m-auto my-8 border-t border-b"
    @submit.prevent="(e) => emit('submit', e)"
  >
    <slot />
  </form>
</template>
