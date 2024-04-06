<script setup lang="ts">
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
  <div class="flex flex-col justify-between flex-1 gap-8 px-4 md:px-8">
    <LayoutHeader />

    <main class="flex-1 w-full mx-auto">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>
