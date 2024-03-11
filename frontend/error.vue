<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />

    <BasePageTitle>{{ error?.statusCode }}</BasePageTitle>
    <p>{{ error?.statusMessage }}</p>
  </NuxtLayout>
</template>
