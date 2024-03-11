<script setup lang="ts">
const config = useRuntimeConfig()
const localePath = useLocalePath()
</script>

<template>
  <header class="px-4">
    <div class="m-auto max-w-5xl border-b py-8">
      <NuxtLink
        class="text-2xl font-semibold"
        :to="localePath('/')"
      >
        {{ config.public.siteName }}
      </NuxtLink>
    </div>
  </header>
</template>
