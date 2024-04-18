import process from 'node:process'
import { type H3Event, eventHandler, readBody } from 'h3'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  const path = `/user/registrationpassword/${body.uid}/${body.timestamp}/${body.token}`

  try {
    const response = await fetch(`${process.env.NUXT_PUBLIC_BACKEND_URL}/${path}`, {
      method: 'GET',
    })

    if (!response || response.status !== 200)
      return new Response('Unauthorized', { status: 401 })

    return response.url.endsWith('/user/login')
  }
  catch (error) {
    return new Response('Unauthorized', { status: 401 })
  }
})
