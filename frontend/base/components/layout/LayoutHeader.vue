<script setup lang="ts">
const config = useRuntimeConfig()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <header class="sticky top-0 z-40 px-4 md:px-8">
    <div
      class="flex items-center justify-between max-w-6xl gap-6 py-6 m-auto font-semibold border-b md:py-8"
    >
      <div class="flex items-center gap-6">
        <NuxtLink
          class="flex items-center gap-2 text-xl md:text-2xl"
          :to="localePath('/')"
        >
          <NuxtImg
            class="w-8 h-8 md:w-12 md:h-12" src="/logo.svg"
            :alt="t('site_logo', { name: config.public.siteName })"
          />
          <h1>{{ config.public.siteName }}</h1>
        </NuxtLink>
      </div>

      <LayoutHeaderMenu />
    </div>
  </header>
</template>
