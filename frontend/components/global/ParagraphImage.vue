<script setup lang="ts">
import type { MediaImage } from '#build/graphql-operations'

const props = defineProps({
  image: {
    type: Object as PropType<MediaImage>,
    required: true,
  },
})

const nonce = useNonce()

const aspect = computed(() => props.image.mediaImage.width / props.image.mediaImage.height)
</script>

<template>
  <div>
    <NuxtImg
      :src="image.mediaImage.url"
      :alt="image.mediaImage.alt ?? ''"
      :width="Math.min(image.mediaImage.width, Math.ceil(1200))"
      :height="Math.min(image.mediaImage.height, Math.ceil(1200 / aspect))"
      :nonce="nonce"
      loading="lazy"
    />
  </div>
</template>
