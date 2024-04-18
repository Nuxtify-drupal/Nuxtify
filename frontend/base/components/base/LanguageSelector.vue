<script setup lang="ts">
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
  <BaseSelect
    id="locale"
    v-model="locale"
    :label="t('language')"
    :options="options"
  />
</template>
