<script setup lang="ts">
import type { MenuAvailable } from '#build/graphql-operations'

const config = useRuntimeConfig()
const localePath = useLocalePath()

const { locale, t } = useI18n()

const { data: menu } = await useAsyncData(
  'menu',
  async () => await useGraphqlQuery(
    'menu',
    {
      name: 'MAIN' as MenuAvailable,
      langcode: locale.value,
    },
  ),
)
</script>

<template>
  <header>
    <div class="flex items-center justify-between max-w-6xl gap-4 py-4 sm:py-8 m-auto border-b font-semibold">
      <div class="flex items-center gap-3 sm:gap-6">
        <NuxtLink
          class="text-xl sm:text-2xl flex items-center gap-2"
          :to="localePath('/')"
        >
          <NuxtImg
            class="w-8 h-8 sm:w-12 sm:h-12"
            src="/logo.svg"
            :alt="t('site_logo', { name: config.public.siteName })"
          />
          {{ config.public.siteName }}
        </NuxtLink>

        <nav>
          <NuxtLink
            v-for="item in menu?.data?.menu?.items"
            :key="item.id"
            :to="localePath(item?.url || '')"
          >
            {{ item.title }}
          </NuxtLink>
        </nav>
      </div>

      <BaseAuthBtns />
    </div>
  </header>
</template>
