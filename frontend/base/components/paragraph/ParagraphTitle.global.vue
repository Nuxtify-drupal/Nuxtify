<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left',
  },
})
</script>

<template>
  <h2
    class="text-3xl"
    :class="{
      'text-end': align === 'right',
      'text-center': align === 'center',
    }"
  >
    {{ title }}
  </h2>
</template>
