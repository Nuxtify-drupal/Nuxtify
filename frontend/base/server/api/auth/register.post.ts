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
    const response = await fetch(
      `${process.env.NUXT_PUBLIC_BACKEND_URL}/user/registerpass?${new URLSearchParams({
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
          name: [{ value: body.email }],
          mail: [{ value: body.email }],
          pass: [{ value: body.password }],
          preferred_langcode: [{ value: body.langcode }],
        }),
      },
    )

    if (!response || response.status !== 200) {
      const json = await response.json()

      if (json.message) {
        let message = json.message.split('\n')
        message.shift()

        message = message.map((line: string) => {
          const [key, value] = line.split(': ')

          if (key !== 'name')
            return value

          return ''
        })

        return new Response(JSON.stringify({
          message: message.filter(Boolean) || [],
        }), { status: 422 })
      }

      return new Response('Unauthorized', { status: 401 })
    }
  }
  catch (error) {
    return new Response('Unauthorized', { status: 401 })
  }
})
