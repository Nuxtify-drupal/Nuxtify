<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const isLoading = ref(false)
const { signIn } = await useAuth()

const email = ref('')
const password = ref('')

const toast = useToast()

async function login(e: SubmitEvent) {
  e.preventDefault()
  isLoading.value = true

  try {
    const { error } = await signIn(
      email.value,
      password.value,
    )

    if (error)
      throw error

    return navigateTo(localePath('/user'))
  }
  catch (error: any) {
    if (process.client) {
      if (typeof error === 'string')
        toast.error(error)
      else
        toast.error(t('login_error_generic'))
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
        type="email"
        name="email"
        autocapitalize="off"
        autocorrect="off"
        autocomplete="email"
        autofocus
        required
      />

      <BaseInput
        v-model="password"
        :label="t('password')"
        type="password"
        name="password"
        required
      />

      <BaseButton
        :loading="isLoading"
      >
        {{ t('login') }}
      </BaseButton>

      <NuxtLink
        class="text-center text-blue-600"
        :to="localePath('/user/register')"
      >
        {{ t('login_register_link') }}
      </NuxtLink>
    </BaseForm>
  </div>
</template>
