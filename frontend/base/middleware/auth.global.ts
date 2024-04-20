interface routeAuthMeta {
  anonOnly?: boolean
  authOnly?: boolean
}

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const routeAuthMeta = to.meta.auth as routeAuthMeta
  const { user, refresh } = await useAuth()

  const uid = useCookie('auth.uid')
  const token = useCookie('auth.token')

  if (!user.value) {
    uid.value = undefined
    token.value = undefined

    if (routeAuthMeta?.authOnly)
      return navigateTo('/user/login')
  }

  if (user.value && token.value) {
    const lastUserRefresh = useLocalStorage('user.refresh.last', Date.now())

    // Refresh the auth token every 5 minutes.
    if (Date.now() - lastUserRefresh.value >= 1000 * 60 * 5) {
      await refresh()
      lastUserRefresh.value = Date.now()
    }
  }

  if (routeAuthMeta?.anonOnly && user.value)
    return navigateTo('/')
})
