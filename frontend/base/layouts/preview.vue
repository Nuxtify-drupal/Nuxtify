<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: '!static',
  },
})
</script>

<template>
  <div class="flex flex-col justify-between flex-1 gap-8 px-4 pb-8 md:px-8">
    <main
      id="main-content"
      class="flex-1 w-full mx-auto"
    >
      <slot />
    </main>
  </div>
</template>
