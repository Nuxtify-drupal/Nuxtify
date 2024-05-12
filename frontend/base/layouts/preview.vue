<script setup lang="ts">
useHead({
  htmlAttrs: {
    class: 'h-auto',
  },
  bodyAttrs: {
    class: 'bg-gray-100 dark:bg-stone-900',
  },
})

const config = useRuntimeConfig()

if (process.client) {
  const { height: windowHeight } = useElementSize(document.body)

  watch(
    windowHeight,
    () => {
      if (windowHeight.value <= 0)
        return

      window.parent.postMessage(
        { name: 'setFrameHeight', height: windowHeight.value },
        config.public.backendUrl,
      )
    },
    { immediate: true },
  )
}
</script>

<template>
  <div class="flex flex-col justify-between flex-1 gap-8 px-4 py-8 md:px-8">
    <main
      id="main-content"
      class="flex-1 w-full mx-auto"
    >
      <slot />
    </main>
  </div>
</template>
