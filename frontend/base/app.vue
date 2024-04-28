<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

const config = useRuntimeConfig()

const i18nHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})

const lang = ref(i18nHead.value.htmlAttrs.lang)
const dir = ref(i18nHead.value.htmlAttrs.dir)

useHead({
  htmlAttrs: {
    lang,
    dir,
    class: 'h-full',
  },
  bodyAttrs: {
    class: 'min-h-full flex flex-col',
  },
  meta: [
    ...(i18nHead.value.meta || []),
    {
      name: 'theme-color',
      content: config.public.manifest.themeColor ?? '#ffffff',
    },
  ],
  link: [
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
  title: '',
  titleTemplate: `%s | ${config.public.siteName}`,
})

async function onBeforeEnter() {
  await finalizePendingLocaleChange()

  lang.value = i18nHead.value.htmlAttrs.lang
  dir.value = i18nHead.value.htmlAttrs.dir
}
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <LayoutMainContentSkip />

    <NuxtPage
      :transition="{
        enterFromClass: 'opacity-0',
        enterToClass: 'opacity-100',
        leaveFromClass: 'opacity-100',
        leaveToClass: 'opacity-0',
        enterActiveClass: 'transition-opacity',
        leaveActiveClass: 'transition-opacity',
        mode: 'out-in',
        onBeforeEnter,
      }"
    />

    <LazyToastContainer />
  </NuxtLayout>
</template>
