import process from 'node:process'
import { type H3Event, eventHandler, readBody } from 'h3'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  const token = await $fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/session/token`)

  if (!token)
    return new Response('Unauthorized', { status: 401 })

  try {
    const response = await fetch(
      `${process.env.NUXT_PUBLIC_BACKEND_URL}/user/login?${new URLSearchParams({
        _format: 'json',
        language: body.langcode,
      })}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token as string,
        },
        body: JSON.stringify({
          name: body.email,
          pass: body.password,
          preferred_langcode: [{ value: body.langcode }],
        }),
      },
    )

    if (!response || response.status !== 200) {
      const json = await response.json()

      if (json.message) {
        return new Response(JSON.stringify({
          message: json.message,
        }), { status: 422 })
      }

      return new Response('Unauthorized', { status: 401 })
    }

    const userData: {
      current_user: {
        uid: string
        name: string
      }
      csrf_token: string
      logout_token: string
      access_token: string
    } = await response.json() as any

    setCookie(event, 'auth.token', userData.access_token)
    setCookie(event, 'auth.uid', userData.current_user.uid)

    return {
      token: userData.access_token,
    }
  }
  catch (error) {
    console.error(error)
    return new Response('Unauthorized', { status: 401 })
  }
})
