<script setup lang="ts">
defineProps({
  props: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <Icon name="mdi:warning" />
      <span>Not implemented yet</span>
    </div>

    <details>
      <summary>Props</summary>
      <pre>{{ props }}</pre>
    </details>
  </div>
</template>
