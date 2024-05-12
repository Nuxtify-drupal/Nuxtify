<script setup lang="ts">
import type { MenuAvailable } from '#build/graphql-operations'

const { locale } = useI18n()
const localePath = useLocalePath()
const user = await useAuth()

const route = useRoute()

const { data: menu } = await useLazyAsyncData(
  'menu',
  async () => await useGraphqlQuery(
    'menu',
    {
      name: 'MAIN' as MenuAvailable,
      langcode: locale.value,
    },
  ),
  {
    watch: [locale, () => user],
  },
)

const menuItemsDesktop = computed(() => menu.value?.data?.menu?.items.slice(0, 3))

const isMenuOpen = ref(false)

const mobileMenuRef = ref<HTMLElement | null>(null)
onClickOutside(mobileMenuRef, () => isMenuOpen.value = false)

watch (
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <div class="flex-1">
    <div class="flex gap-6 max-md:hidden">
      <nav class="flex flex-1 gap-6">
        <NuxtLink
          v-for="item in menuItemsDesktop" :key="item.id"
          class="flex items-center gap-1" :to="localePath(item?.url || '')"
        >
          <Icon v-if="item.extras?.icon" :name="item.extras.icon" />

          {{ item.title }}
        </NuxtLink>
      </nav>

      <BaseAuthBtns />
    </div>

    <div class="text-right md:hidden">
      <Icon
        class="w-8 h-8 cursor-pointer" name="mdi:menu" role="button"
        @click="isMenuOpen = !isMenuOpen"
      />
    </div>

    <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-black/50">
      <div
        v-if="isMenuOpen" ref="mobileMenuRef"
        class="fixed top-0 bottom-0 flex flex-col gap-4 p-6 bg-white sm:w-96"
      >
        <div class="text-right">
          <Icon
            class="w-8 h-8 text-right cursor-pointer" name="mdi:close"
            role="button" @click="isMenuOpen = false"
          />
        </div>

        <NuxtLink
          v-for="item in menu?.data?.menu?.items" :key="item.id"
          class="flex items-center gap-1"
          :to="localePath(item?.url || '')"
        >
          <Icon
            v-if="item.extras?.icon"
            :name="item.extras.icon"
          />

          {{ item.title }}
        </NuxtLink>

        <BaseAuthBtns />
      </div>
    </div>
  </div>
</template>
