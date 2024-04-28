<script setup lang="ts">
const switchLocalePath = useSwitchLocalePath()
const { locale: initialLocale, t, locales } = useI18n()

const locale = ref(initialLocale.value)

watch(
  locale,
  async () => {
    return await navigateTo(switchLocalePath(locale.value))
  },
)

const options = computed(() => ([{
  key: t('language'),
  options: locales.value.map(locale => ({
    value: locale.code ?? '',
    label: t(locale.name?.toLowerCase() ?? ''),
  })),
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
