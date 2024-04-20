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
  }

  if (user)
    await refresh()

  if (!uid.value || !token.value) {
    if (routeAuthMeta?.authOnly)
      return navigateTo('/user/login')

    return
  }

  if (!user) {
    if (routeAuthMeta?.authOnly)
      return navigateTo('/user/login')

    return
  }

  if (routeAuthMeta?.anonOnly && user)
    return navigateTo('/')
})
