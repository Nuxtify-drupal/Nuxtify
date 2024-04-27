<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale: initialLocale, t } = useI18n()

const locale = ref(initialLocale.value)

watch(
  locale,
  async () => {
    return await navigateTo(switchLocalePath(locale.value))
  },
)

const options = computed(() => ([{
  key: t('language'),
  options: [
    { value: 'en', label: t('english') },
    { value: 'nl', label: t('dutch') },
  ],
}]))
</script>

<template>
  <BaseSelect
    id="locale"
    v-model="locale"
    :label="t('language')"
    :options="options"
  />
</template>
