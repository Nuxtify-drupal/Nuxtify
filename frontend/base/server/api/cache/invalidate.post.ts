import process from 'node:process'

export default defineEventHandler(async (event) => {
  const { tags } = await readBody(event)
  const { headers } = event
  const token = headers.get('token') ?? ''

  if (token !== process.env.BACKEND_API_KEY)
    return new Response('Unauthorized', { status: 401 })

  const storage = useStorage('cacheData')
  const storageKeys = await storage.getKeys()

  for (const tag of tags) {
    for (const key of storageKeys) {
      if (key.includes(`${tag.replace('/', ':')}`))
        await storage.removeItem(key)
    }
  }

  return {}
})
