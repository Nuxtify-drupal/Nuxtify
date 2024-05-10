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
  <h3
    class="text-2xl"
    :class="{
      'text-end': align === 'right',
      'text-center': align === 'center',
    }"
  >
    {{ title }}
  </h3>
</template>
