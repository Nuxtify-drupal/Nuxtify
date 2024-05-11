<script setup lang="ts">
import type { MediaImage } from '#build/graphql-operations'

const props = defineProps({
  image: {
    type: Object as PropType<MediaImage>,
    required: true,
  },
  align: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'left',
  },
})

const nonce = useNonce()

const aspect = computed(() => props.image.mediaImage.width / props.image.mediaImage.height)
</script>

<template>
  <NuxtImg
    :class="{
      'ms-auto': align === 'right',
      'mx-auto': align === 'center',
    }"
    :src="image.mediaImage.url"
    :alt="image.mediaImage.alt ?? ''"
    :width="Math.min(image.mediaImage.width, Math.ceil(1200))"
    :height="Math.min(image.mediaImage.height, Math.ceil(1200 / aspect))"
    :nonce="nonce"
    loading="lazy"
  />
</template>
