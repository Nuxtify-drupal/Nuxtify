<script setup lang="ts">
const config = useRuntimeConfig()
const localePath = useLocalePath()
</script>

<template>
  <header>
    <div class="flex items-center justify-between max-w-6xl gap-8 py-8 m-auto border-b">
      <NuxtLink
        class="text-2xl font-semibold"
        :to="localePath('/')"
      >
        {{ config.public.siteName }}
      </NuxtLink>

      <BaseAuthBtns />
    </div>
  </header>
</template>
