<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const isLoading = ref(false)
const { signIn } = useAuth()

const email = ref('')
const password = ref('')

async function login(e: SubmitEvent) {
  e.preventDefault()
  isLoading.value = true

  try {
    await signIn(
      email.value,
      password.value,
    )

    navigateTo(localePath('/user'))
  }
  catch (error) {
    console.error(error)
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
  title: t('login'),
  meta: [
    {
      name: 'description',
      content: t('login'),
    },
  ],
})
</script>

<template>
  <div class="flex flex-col max-w-6xl gap-8 m-auto">
    <BaseForm
      method="POST"
      @submit.prevent="login"
    >
      <BasePageTitle>
        {{ t('login') }}
      </BasePageTitle>

      <BaseInput
        v-model="email"
        :label="t('email')"
        name="email"
        required
      />

      <BaseInput
        v-model="password"
        :label="t('password')"
        name="password"
        type="password"
        required
      />

      <BaseButton
        :loading="isLoading"
      >
        {{ t('login') }}
      </BaseButton>
    </BaseForm>
  </div>
</template>

<i18n lang="yaml" scoped>
en:
  login: Log in
  email: Email
  password: Password

nl:
  login: Inloggen
  email: E-mail
  password: Wachtwoord
</i18n>
