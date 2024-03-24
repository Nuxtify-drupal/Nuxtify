<script setup lang="ts">
const { user } = await useAuth()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="font-semibold">
    <ClientOnly>
      <template #fallback>
        <div class="relative w-16 max-w-full">
          <SkeletonPlaceholderSingle
            class="absolute inset-0"
            height="1rem"
          />
        </div>
      </template>
      <div
        v-if="user"
        class="flex gap-6"
      >
        <NuxtLink
          class="flex items-center gap-1"
          :to="localePath('/user')"
        >
          <Icon name="uil:user" />
          {{ user.name }}
        </NuxtLink>

        <NuxtLink
          class="flex items-center gap-1"
          :to="localePath('/user/logout')"
        >
          <Icon name="uil:signout" />
          {{ t('logout') }}
        </NuxtLink>
      </div>

      <div
        v-if="!user"
        class="flex gap-6"
      >
        <NuxtLink
          class="flex items-center gap-1"
          :to="localePath('/user/login')"
        >
          <Icon name="uil:signin" />
          {{ t('login') }}
        </NuxtLink>

        <NuxtLink
          class="flex items-center gap-1"
          :to="localePath('/user/register')"
        >
          <Icon name="uil:user-plus" />
          {{ t('register') }}
        </NuxtLink>
      </div>
    </ClientOnly>
  </div>
</template>
