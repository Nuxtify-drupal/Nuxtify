<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '100%',
  },
  maxWidth: {
    type: String,
    default: undefined,
  },
  maxHeight: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <div
    class="flex items-center justify-center pointer-events-none"
  >
    <div
      class="bg-gray-200 rounded-full animate-pulse"
      :style="{
        width: width || undefined,
        height: height || undefined,
        maxWidth: maxWidth || undefined,
        maxHeight: maxHeight || undefined,
      }"
    />
  </div>
</template>
