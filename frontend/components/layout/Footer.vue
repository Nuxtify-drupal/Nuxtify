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

const options = computed(() => ([
  { value: 'en', label: t('english') },
  { value: 'nl', label: t('dutch') },
]))
</script>

<template>
  <footer>
    <div class="flex justify-between max-w-6xl py-8 m-auto text-gray-600 border-t">
      <span class="text-sm">
        {{ config.public.siteName }} &copy; {{ new Date().getFullYear() }}
      </span>

      <BaseSelect
        id="locale"
        v-model="locale"
        :label="t('language')"
        :options="options"
      />
    </div>
  </footer>
</template>
