<script setup lang="ts">
const { user } = await useAuth()
const { t } = useI18n()
const localePath = useLocalePath()

const links = computed(() => {
  if (user.value) {
    return [
      {
        to: '/user',
        icon: 'uil:user',
        text: user.value.name,
      },
      {
        to: '/user/logout',
        icon: 'uil:signout',
        text: t('logout'),
      },
    ]
  }

  return [
    {
      to: '/user/login',
      icon: 'uil:signin',
      text: t('login'),
    },
    {
      to: '/user/register',
      icon: 'uil:user-plus',
      text: t('register'),
    },
  ]
})
</script>

<template>
  <div
    v-for="link in links"
    :key="link.to"
  >
    <NuxtLink
      class="flex items-center gap-1"
      :to="localePath(link.to)"
    >
      <Icon
        :name="link.icon"
      />

      {{ link.text }}
    </NuxtLink>
  </div>
</template>
