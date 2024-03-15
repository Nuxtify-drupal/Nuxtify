<script setup lang="ts">
const { getUser, isAuthenticated } = useAuth()
const { t } = useI18n()
const localePath = useLocalePath()

const user = ref<User | undefined>(undefined)

const isUserLoading = ref(true)

watch(
  () => isAuthenticated.value,
  async () => {
    const userData = isAuthenticated.value ? await getUser() : undefined

    isUserLoading.value = false

    user.value = userData
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="font-semibold">
    <ClientOnly>
      <div
        v-if="isUserLoading"
        class="relative w-16 max-w-full"
      >
      &nbsp;
        <SkeletonPlaceholderSingle
          class="absolute inset-0"
          height="1rem"
        />
      </div>

      <div
        v-if="!isUserLoading && user"
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

      <NuxtLink
        v-if="!isUserLoading && !user"
        class="flex items-center gap-1"
        :to="localePath('/user/login')"
      >
        <Icon name="uil:signin" />
        {{ t('login') }}
      </NuxtLink>
    </ClientOnly>
  </div>
</template>
