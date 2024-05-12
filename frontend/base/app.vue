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
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
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

defineOgImageComponent('LayoutOgImage')

const route = useRoute()

useSeoMeta({
  ogImage: `${config.public.baseUrl}/__og-image__/image${route.path}/og.png`,
  twitterImage: `${config.public.baseUrl}/__og-image__/image${route.path}/og.png`,
  twitterCard: 'summary_large_image',
})
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

    <ToastContainer />
  </NuxtLayout>
</template>
