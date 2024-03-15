<script setup lang="ts">
const { getUser } = useAuth()
const { t } = useI18n()
const localePath = useLocalePath()

const user = await getUser()

definePageMeta({
  auth: {
    authOnly: true,
  },
})
</script>

<template>
  <div class="max-w-6xl m-auto">
    <div v-if="user" class="flex flex-col gap-8">
      <BasePageTitle>
        {{ user.name }}
      </BasePageTitle>

      <NuxtLink
        class="flex items-center gap-1"
        :to="localePath('/user/logout')"
      >
        <Icon name="uil:signout" />
        {{ t('logout') }}
      </NuxtLink>
    </div>
  </div>
</template>
