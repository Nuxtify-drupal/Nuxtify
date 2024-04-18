<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

async function onBeforeEnter() {
  await finalizePendingLocaleChange()
}

const config = useRuntimeConfig()

const i18nHead = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
    dir: i18nHead.value.htmlAttrs!.dir,
  },
  bodyAttrs: {
    class: 'absolute inset-0 flex flex-col',
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
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />

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
  </NuxtLayout>
</template>
