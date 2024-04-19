<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

useHead({
  bodyAttrs: {
    class: 'absolute inset-0 flex flex-col',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />

    <div class="flex flex-col max-w-6xl gap-8 m-auto">
      <BasePageTitle>{{ error?.statusCode }}</BasePageTitle>
      <p>{{ error?.statusMessage }}</p>
    </div>
  </NuxtLayout>
</template>
