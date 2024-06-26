<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const isLoading = ref(false)
const { signUp } = await useAuth()

const email = ref('')
const password = ref('')
const password_confirm = ref('')

const toast = useToast()

async function register(e: SubmitEvent) {
  e.preventDefault()
  isLoading.value = true

  try {
    const { error } = await signUp(
      email.value,
      password.value,
      password_confirm.value,
      locale.value,
    )

    if (error)
      throw error

    return navigateTo(localePath('/user/register/confirm'))
  }
  catch (error: any) {
    if (process.client) {
      if (typeof error === 'string') {
        toast.error(error)
        return
      }

      if (typeof error === 'object') {
        for (const key in error) {
          if (error[key])
            toast.error(error[key])
        }
      }
    }
  }
  finally {
    isLoading.value = false
  }
}

definePageMeta({
  auth: {
    anonOnly: true,
  },
})

useHead({
  title: t('register'),
  meta: [
    {
      name: 'description',
      content: t('register'),
    },
  ],
})

useSeoMeta({
  twitterTitle: t('register'),
  twitterDescription: t('register'),
})
</script>

<template>
  <div class="flex flex-col max-w-6xl gap-8 m-auto">
    <BaseForm
      method="POST"
      @submit.prevent="register"
    >
      <BasePageTitle>
        {{ t('register') }}
      </BasePageTitle>

      <BaseInput
        v-model="email"
        :label="t('email')"
        type="email"
        name="email"
        autocomplete="email"
        autofocus
        required
      />

      <BaseInput
        v-model="password"
        :label="t('password')"
        name="password"
        type="password"
        required
      />

      <BaseInput
        v-model="password_confirm"
        :label="t('password_confirm')"
        name="password_confirm"
        type="password"
        required
      />

      <BaseButton
        :loading="isLoading"
      >
        {{ t('register') }}
      </BaseButton>

      <NuxtLink
        class="text-center text-blue-600"
        :to="localePath('/user/login')"
      >
        {{ t('register_login_link') }}
      </NuxtLink>
    </BaseForm>
  </div>
</template>
