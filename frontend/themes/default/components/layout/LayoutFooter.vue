<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <footer class="bg-white dark:bg-stone-950">
    <div class="flex items-center justify-between max-w-6xl px-4 py-8 m-auto text-gray-600 dark:text-gray-400 md:px-8">
      <span class="text-sm">
        {{ config.public.siteName }} &copy; {{ new Date().getFullYear() }}
      </span>

      <BaseLanguageSelector />
    </div>
  </footer>
</template>
