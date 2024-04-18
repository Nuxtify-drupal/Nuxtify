<script setup lang="ts">
const config = useRuntimeConfig()
</script>

<template>
  <footer>
    <div class="flex justify-between max-w-6xl px-4 py-8 m-auto text-gray-600 border-t md:px-8">
      <span class="text-sm">
        {{ config.public.siteName }} &copy; {{ new Date().getFullYear() }}
      </span>

      <BaseLanguageSelector />
    </div>
  </footer>
</template>
