<script setup lang="ts">
const config = useRuntimeConfig()

const switchLocalePath = useSwitchLocalePath()
const { locale, t } = useI18n()

watch(
  () => locale.value,
  () => {
    return navigateTo(switchLocalePath(locale.value))
  },
)
</script>

<template>
  <footer>
    <div class="flex justify-between max-w-6xl py-4 sm:py-8 m-auto text-gray-600 border-t">
      <span class="text-sm">
        {{ config.public.siteName }} &copy; {{ new Date().getFullYear() }}
      </span>

      <BaseSelect
        id="locale"
        v-model="locale"
        :label="t('language')"
      >
        <option
          value="en"
        >
          {{ t('english') }}
        </option>
        <option value="nl">
          {{ t('dutch') }}
        </option>
      </BaseSelect>
    </div>
  </footer>
</template>
