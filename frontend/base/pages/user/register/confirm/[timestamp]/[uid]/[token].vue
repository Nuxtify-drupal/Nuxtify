<script setup lang="ts">
const { t } = useI18n()

const route = useRoute()
const localePath = useLocalePath()

const { timestamp, uid, token } = route.params
const { verify } = await useAuth()

const toast = useToast()

if (process.client) {
  try {
    const { error } = await verify(
      timestamp as string,
      uid as string,
      token as string,
    )

    if (error) {
      navigateTo(localePath('/user/login'))
      throw error
    }

    if (process.client)
      toast.success(t('register_email_confirm_success'))

    navigateTo(localePath('/user/login'))
  }
  catch (error) {
    console.error(error)
  }
}

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
  <div />
</template>
