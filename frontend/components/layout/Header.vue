<script setup lang="ts">
const config = useRuntimeConfig()
const localePath = useLocalePath()
</script>

<template>
  <header>
    <div class="max-w-5xl py-8 m-auto border-b">
      <NuxtLink
        class="text-2xl font-semibold"
        :to="localePath('/')"
      >
        {{ config.public.siteName }}
      </NuxtLink>
    </div>
  </header>
</template>
