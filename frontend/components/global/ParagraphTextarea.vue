<script setup lang="ts">
defineProps({
  content: {
    type: {} as PropType<{
      processed: string
    }>,
    required: true,
  },
})
</script>

<template>
  <div v-html="content.processed" />
</template>
