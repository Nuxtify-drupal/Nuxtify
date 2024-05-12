<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()

const config = useRuntimeConfig()
</script>

<template>
  <div class="w-full h-full px-12 text-2xl">
    <div class="flex flex-row items-center gap-4 py-8 mb-12 border-b border-gray-200">
      <img
        src="/logo-512.png"
        height="96px"
        width="96px"
        alt=""
      >
      <h1>
        {{ config.public.siteName }}
      </h1>
    </div>

    <h2 class="mt-0 mb-4 font-normal">
      {{ title }}
    </h2>

    <p class="mt-0 leading-10 text-justify text-ellipsis line-clamp-4">
      {{ description }}
    </p>
  </div>
</template>
