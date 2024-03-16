import process from 'node:process'
import { type H3Event, eventHandler, readBody } from 'h3'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  if (!body.email || !body.password)
    return new Response('Unauthorized', { status: 401 })

  if (body.password !== body.password_confirm)
    return new Response('Unauthorized', { status: 401 })

  const token = await $fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/session/token`)

  if (!token)
    return new Response('Unauthorized', { status: 401 })

  try {
    const response = await fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/user/registerpass?_format=json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token as string,
      },
      body: JSON.stringify({
        name: [{ value: body.email }],
        mail: [{ value: body.email }],
        pass: [{ value: body.password }],
        preferred_langcode: [{ value: body.langcode }],
      }),
    })

    if (!response || response.status !== 200)
      return new Response('Unauthorized', { status: 401 })
  }
  catch (error) {
    return new Response('Unauthorized', { status: 401 })
  }
})
