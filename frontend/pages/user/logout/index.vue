<script setup lang="ts">
const localePath = useLocalePath()

const { signOut } = await useAuth()

await signOut()
navigateTo(localePath('/user/login'))

definePageMeta({
  auth: {
    authOnly: true,
  },
})
</script>

<template>
  <div />
</template>
