<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h2 class="text-3xl font-semibold">
    {{ title }}
  </h2>
</template>
