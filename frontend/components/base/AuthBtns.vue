<script setup lang="ts">
const { user } = await useAuth()
const { t } = useI18n()
const localePath = useLocalePath()

const wrapperClasses = 'flex justify-between gap-6'
const linkClasses = 'flex items-center gap-1'
</script>

<template>
  <div>
    <div
      v-if="user"
      :class="wrapperClasses"
    >
      <NuxtLink
        :class="linkClasses"
        :to="localePath('/user')"
      >
        <Icon name="uil:user" />
        {{ user.name }}
      </NuxtLink>

      <NuxtLink
        :class="linkClasses"
        :to="localePath('/user/logout')"
      >
        <Icon name="uil:signout" />
        {{ t('logout') }}
      </NuxtLink>
    </div>

    <div
      v-if="!user"
      :class="wrapperClasses"
    >
      <NuxtLink
        :class="linkClasses"
        :to="localePath('/user/login')"
      >
        <Icon name="uil:signin" />
        {{ t('login') }}
      </NuxtLink>

      <NuxtLink
        :class="linkClasses"
        :to="localePath('/user/register')"
      >
        <Icon name="uil:user-plus" />
        {{ t('register') }}
      </NuxtLink>
    </div>
  </div>
</template>
