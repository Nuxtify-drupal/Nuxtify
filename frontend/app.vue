<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

async function onBeforeEnter() {
  await finalizePendingLocaleChange()
}
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
