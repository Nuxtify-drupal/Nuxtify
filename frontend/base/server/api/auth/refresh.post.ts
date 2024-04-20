import process from 'node:process'
import { type H3Event, eventHandler, readBody } from 'h3'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  const tokenResponse = await fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/session/token`)

  if (!tokenResponse || tokenResponse.status !== 200)
    return new Response('Unauthorized', { status: 401 })

  const token = await tokenResponse.text()

  if (!token)
    return new Response('Unauthorized', { status: 401 })

  try {
    const response = await fetch(
      `${process.env.NUXT_PUBLIC_BACKEND_URL}/jwt/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token as string,
          'Authorization': `Bearer ${body.token}`,
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

    const jwtToken = await response.json()

    if (!jwtToken.token)
      return new Response('Unauthorized', { status: 401 })

    setCookie(event, 'auth.token', jwtToken.token)

    return {
      token: jwtToken.token,
    }
  }
  catch (error) {
    console.error(error)
    return new Response('Unauthorized', { status: 401 })
  }
})
