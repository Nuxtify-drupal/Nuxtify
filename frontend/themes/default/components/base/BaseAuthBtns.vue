<script setup lang="ts">
const { user } = await useAuth()
const { t } = useI18n()
const localePath = useLocalePath()

const links = computed(() => {
  if (user.value) {
    return [
      {
        to: '/user',
        icon: 'mdi:user-outline',
        text: user.value.name,
      },
      {
        to: '/user/logout',
        icon: 'mdi:sign-out',
        text: t('logout'),
      },
    ]
  }

  return [
    {
      to: '/user/login',
      icon: 'mdi:sign-in',
      text: t('login'),
    },
    {
      to: '/user/register',
      icon: 'mdi:user-add-outline',
      text: t('register'),
    },
  ]
})
</script>

<template>
  <nav
    class="flex justify-between gap-6"
  >
    <template
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
    </template>
  </nav>
</template>
