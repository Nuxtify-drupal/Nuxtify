<script setup lang="ts">
const localePath = useLocalePath()

const { signOut } = useAuth()

await signOut()
navigateTo(localePath('/user/login'))

definePageMeta({
  auth: {
    authOnly: true,
  },
})
</script>
