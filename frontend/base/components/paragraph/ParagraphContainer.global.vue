<script setup lang="ts">
import type { ParagraphUnion } from '#build/graphql-operations'

defineProps({
  paragraphs: {
    type: Object as PropType<ParagraphUnion[]>,
    required: false,
  },
})
</script>

<template>
  <div
    v-for="{ __typename, ...paragraph } in paragraphs"
    :key="paragraph.id"
  >
    <component
      :is="__typename"
      v-bind="paragraph"
    />
  </div>
</template>
