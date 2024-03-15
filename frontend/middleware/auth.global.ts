interface routeAuthMeta {
  anonOnly?: boolean
  authOnly?: boolean
}

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const routeAuthMeta = to.meta.auth as routeAuthMeta

  const uid = useCookie('auth.uid')
  const token = useCookie('auth.token')

  if (!uid.value || !token.value) {
    if (routeAuthMeta?.authOnly)
      return navigateTo('/user/login')

    return
  }

  let user

  try {
    user = await $fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: uid.value, token: token.value }),
    })
  }
  catch (error) {
    uid.value = undefined
    token.value = undefined
  }

  if (!user) {
    if (routeAuthMeta?.authOnly)
      return navigateTo('/user/login')

    return
  }

  if (routeAuthMeta?.anonOnly && user)
    return navigateTo('/')
})
