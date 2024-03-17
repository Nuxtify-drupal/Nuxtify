export default function useToast() {
  const nuxtApp = useNuxtApp()

  return nuxtApp.$toast
}
