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
  link: [
    ...(i18nHead.value.link || []),
  ],
  meta: [
    ...(i18nHead.value.meta || []),
  ],
  title: '',
  titleTemplate: `%s | ${config.public.siteName}`,
})
</script>

<template>
  <div class="flex flex-col justify-between min-h-screen gap-8">
    <LayoutHeader />

    <main class="relative flex-1 w-full mx-auto px-4">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>
