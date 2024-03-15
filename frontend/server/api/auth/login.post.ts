import process from 'node:process'
import { type H3Event, eventHandler, readBody } from 'h3'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  const token = await $fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/session/token`)

  if (!token)
    return new Response('Unauthorized', { status: 401 })

  try {
    const response = await fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/user/login?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token as string,
      },
      body: JSON.stringify({
        name: body.email,
        pass: body.password,
      }),
    })

    if (!response || response.status !== 200)
      return new Response('Unauthorized', { status: 401 })

    const userData = await response.json()
    const cookies = response.headers.getSetCookie()
    const cookieHeader = cookies.join('; ')

    const jwtToken: {
      token: string
    } = await $fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/jwt/token?_format=json`, {
      headers: {
        Cookie: cookieHeader,
      },
    })

    setCookie(event, 'auth.token', jwtToken.token)
    setCookie(event, 'auth.uid', userData.current_user.uid)

    return jwtToken
  }
  catch (error) {
    return new Response('Unauthorized', { status: 401 })
  }
})
