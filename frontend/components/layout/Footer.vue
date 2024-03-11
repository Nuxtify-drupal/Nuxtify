<script setup lang="ts">
const config = useRuntimeConfig()

const switchLocalePath = useSwitchLocalePath()
const { locale } = useI18n()

watch(
  () => locale.value,
  () => {
    navigateTo(switchLocalePath(locale.value))
  },
)
</script>

<template>
  <footer class="px-4">
    <div class="m-auto max-w-5xl border-t py-8 text-gray-600 flex justify-between">
      <span class="text-sm">
        {{ config.public.siteName }} &copy; {{ new Date().getFullYear() }}
      </span>
      <select v-model="locale">
        <option
          value="en"
        >
          English
        </option>
        <option value="nl">
          Nederlands
        </option>
      </select>
    </div>
  </footer>
</template>
