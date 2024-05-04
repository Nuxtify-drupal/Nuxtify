export default defineEventHandler(async (event) => {
  const { tags } = await readBody(event)

  const storage = useStorage('cacheData')
  const storageKeys = await storage.getKeys()

  for (const tag of tags) {
    for (const key of storageKeys) {
      if (key.includes(`${tag.replace('/', ':')}&`))
        await storage.removeItem(key)
    }
  }

  return {}
})
