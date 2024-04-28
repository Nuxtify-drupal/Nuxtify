<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()

const config = useRuntimeConfig()
</script>

<template>
  <div class="w-full h-full text-3xl leading-6 text-white bg-stone-900">
    <div
      class="flex items-center gap-8 px-12 py-8 mb-12 border-b bg-stone-800 border-stone-700"
    >
      <img src="/logo-512.png" height="96px" width="96px" alt="">
      <h1>
        {{ config.public.siteName }}
      </h1>
    </div>

    <div class="px-12">
      <h2 class="mt-0 mb-8">
        {{ title }}
      </h2>

      <p class="mt-0 leading-10 text-justify text-ellipsis line-clamp-4">
        {{ description }}
      </p>
    </div>
  </div>
</template>
