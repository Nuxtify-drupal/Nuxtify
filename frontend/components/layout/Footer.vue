<script setup lang="ts">
const config = useRuntimeConfig()

const switchLocalePath = useSwitchLocalePath()
const { locale, t } = useI18n()

watch(
  () => locale.value,
  () => {
    navigateTo(switchLocalePath(locale.value))
  },
)
</script>

<template>
  <footer class="px-4">
    <div class="flex justify-between max-w-5xl py-8 m-auto text-gray-600 border-t">
      <span class="text-sm">
        {{ config.public.siteName }} &copy; {{ new Date().getFullYear() }}
      </span>
      <select
        v-model="locale"
        :aria-label="t('language')"
      >
        <option
          value="en"
        >
          {{ t('english') }}
        </option>
        <option value="nl">
          {{ t('dutch') }}
        </option>
      </select>
    </div>
  </footer>
</template>

<i18n lang="yaml">
en:
  language: 'Language'
  english: 'English'
  dutch: 'Dutch'

nl:
  language: 'Taal'
  english: 'Engels'
  dutch: 'Nederlands'
</i18n>
