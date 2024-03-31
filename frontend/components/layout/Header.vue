<script setup lang="ts">
const config = useRuntimeConfig()
const localePath = useLocalePath()

const { t } = useI18n()
</script>

<template>
  <header>
    <div class="flex items-center justify-between max-w-6xl gap-4 py-4 sm:py-8 m-auto border-b">
      <NuxtLink
        class="text-xl sm:text-2xl font-semibold flex items-center gap-2"
        :to="localePath('/')"
      >
        <NuxtImg
          class="w-8 h-8 sm:w-12 sm:h-12"
          src="/logo.svg"
          :alt="t('site_logo', { name: config.public.siteName })"
        />
        {{ config.public.siteName }}
      </NuxtLink>

      <BaseAuthBtns />
    </div>
  </header>
</template>
