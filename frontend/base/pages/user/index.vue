<script setup lang="ts">
import type { RouteInternal, User } from '#build/graphql-operations'

const { user } = await useAuth()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const token = useCookie('auth.token')

definePageMeta({
  auth: {
    authOnly: true,
  },
})

const { data } = await useAsyncData(
  'user',
  async () => await useGraphqlQuery({
    name: 'user',
    variables: {
      path: `/user/${user.value?.id}`,
      langcode: locale.value,
    },
    fetchOptions: {
      headers: {
        token: '',
        Authorization: `Bearer ${token.value}`,
      },
    },
  }),
)

if (data.value?.data?.route === null)
  showError({ statusCode: 404, statusMessage: 'Not Found' })

const userData = ref<User | undefined>(undefined)

function setUserData() {
  userData.value = (data.value?.data?.route as RouteInternal)?.entity as User || undefined
}

setUserData()

useHead({
  title: userData.value?.name,
})

const unwatchData = watch(data, () => {
  setUserData()
})

onBeforeRouteLeave((to, from) => {
  if (to.name !== from.name)
    unwatchData()
})
</script>

<template>
  <div class="max-w-6xl m-auto">
    <div v-if="userData" class="flex flex-col gap-8">
      <div class="flex flex-wrap items-center justify-between">
        <BasePageTitle>
          {{ userData.name }}
        </BasePageTitle>

        <BaseButton
          class="flex items-center gap-1"
          :to="localePath('/user/logout')"
        >
          <Icon name="uil:signout" />
          {{ t('logout') }}
        </BaseButton>
      </div>

      <div>
        <b>{{ t('member_since') }}</b>: {{ new Date(userData.created.timestamp * 1000).toDateString() }}
      </div>
    </div>
  </div>
</template>
