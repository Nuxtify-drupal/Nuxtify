<script setup lang="ts">
const config = useRuntimeConfig()

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <header class="sticky top-0 z-40 px-4 bg-white border-b border-gray-200 shadow-md dark:bg-stone-800 md:px-8 shadow-gray-200 dark:shadow-stone-950 dark:border-stone-700">
    <div
      class="flex items-center justify-between max-w-6xl gap-6 py-6 m-auto font-semibold md:py-8"
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
          {{ config.public.siteName }}
        </NuxtLink>
      </div>

      <LayoutHeaderMenu />
    </div>
  </header>
</template>
