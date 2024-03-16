<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  auth: {
    anonOnly: true,
  },
})

useHead({
  title: t('register_email_confirm'),
  meta: [
    {
      name: 'description',
      content: t('register_email_confirm'),
    },
  ],
})
</script>

<template>
  <div class="flex flex-col max-w-6xl gap-8 m-auto">
    <BasePageTitle>
      {{ t('register_email_confirm') }}
    </BasePageTitle>

    <p>
      {{ t('register_email_confirm_text') }}
    </p>
  </div>
</template>
