<script setup lang="ts">
import type { MenuAvailable } from '#build/graphql-operations'

const { locale } = useI18n()
const localePath = useLocalePath()

const route = useRoute()

const { data: menu, refresh } = await useAsyncData(
  'menu',
  async () => await useGraphqlQuery(
    'menu',
    {
      name: 'MAIN' as MenuAvailable,
      langcode: locale.value,
    },
  ),
)

watch(
  () => locale.value,
  async () => {
    await refresh()
  },
)

const menuItemsDesktop = computed(() => menu.value?.data?.menu?.items.slice(0, 3))

const isMenuOpen = ref(false)
const hasBackdropOpened = ref(false)

const mobileMenuRef = ref<HTMLElement | null>(null)
onClickOutside(mobileMenuRef, () => hasBackdropOpened.value = false)

watch (
  () => route.fullPath,
  () => {
    hasBackdropOpened.value = false
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

    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="bg-transparent backdrop-blur-none"
      leave-active-class="transition-all duration-300"
      leave-to-class="bg-transparent backdrop-blur-none"
      @after-enter="hasBackdropOpened = true"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur"
      >
        <Transition
          enter-active-class="transition-transform duration-300"
          enter-from-class="-translate-x-full"
          leave-active-class="transition-transform duration-300"
          leave-to-class="-translate-x-full"
          @after-leave="isMenuOpen = false"
        >
          <div
            v-if="hasBackdropOpened"
            ref="mobileMenuRef"
            class="fixed top-0 bottom-0 w-full p-2 sm:w-96"
          >
            <div
              class="flex flex-col h-full p-8 text-lg bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-stone-800 dark:border-stone-700"
            >
              <div class="text-right">
                <Icon
                  class="w-8 h-8 text-right cursor-pointer"
                  name="mdi:close"
                  role="button"
                  @click="hasBackdropOpened = false"
                />
              </div>

              <div class="flex-1">
                <NuxtLink
                  v-for="item in menu?.data?.menu?.items" :key="item.id"
                  class="flex items-center gap-1 py-4"
                  :to="localePath(item?.url || '')"
                >
                  <Icon
                    v-if="item.extras?.icon"
                    class="w-6 h-6"
                    :name="item.extras.icon"
                  />

                  {{ item.title }}
                </NuxtLink>
              </div>

              <BaseAuthBtns />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
