import process from 'node:process'

import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'
import type { FetchError, FetchOptions, FetchResponse } from 'ofetch'

import { timestamp } from '@vueuse/core'

interface CacheData {
  data: any
  timestamp: number
}

const storage = useStorage('cacheData')

function getCacheKey(url: URL): string {
  const path = url.pathname.replace('/api/graphql', '')
  const params = `${decodeURIComponent(url.searchParams.toString())}&`

  const cacheKey = `${path}:${params}`

  return cacheKey
}

export default defineGraphqlServerOptions({
  serverFetchOptions(
    event,
    _operation,
    _operationName,
  ) {
    if (!event)
      return { }

    const headers = event.headers

    if (headers.has('Authorization')) {
      if (!headers.get('Authorization')?.startsWith('Basic ')) {
        return {
          headers: {
            Authorization: headers.get('Authorization') || '',
          },
        } as FetchOptions
      }
    }

    const token = process.env.BACKEND_API_KEY || ''

    return {
      headers: {
        token,
      },
    } as FetchOptions
  },

  async doGraphqlRequest({
    event,
    operationName,
    operationDocument,
    variables,
  }) {
    if (!this.serverFetchOptions)
      return

    const url = new URL(`${process.env.NUXT_PUBLIC_BASE_URL}${event._path}`)

    if (await storage.hasItem(getCacheKey(url))) {
      const cachedData = await storage.getItem<CacheData>(getCacheKey(url))
      const now = timestamp()

      if (cachedData && now - cachedData.timestamp < 3600000)
        return cachedData.data as unknown

      await storage.removeItem(getCacheKey(url))
    }

    const runtimeConfig = useRuntimeConfig().graphqlMiddleware

    const endpoint = await getEndpoint(
      runtimeConfig,
    )

    const fetchOptions = await this.serverFetchOptions(event, operationName)

    return $fetch
      .raw(endpoint, {
        method: 'POST' as any,
        body: {
          query: operationDocument,
          variables,
          operationName,
        },
        ...fetchOptions,
      })
      .then(async (response) => {
        if (!this.onServerResponse)
          return

        return await this.onServerResponse(
          event,
          response as any,
        ) as any
      })
      .catch((error) => {
        return onServerError(
          error,
        )
      })
  },

  async onServerResponse(event, response) {
    if (Math.floor(response.status / 100) !== 2)
      event.respondWith(response)

    const data = {
      data: response._data || undefined,
      timestamp: timestamp(),
    }

    const url = new URL(`${process.env.NUXT_PUBLIC_BASE_URL}${event._path}`)
    await storage.setItem<CacheData>(getCacheKey(url), data)

    return response._data
  },
})

/**
 * Get the URL of the GraphQL endpoint.
 */
function getEndpoint(config: any): string | Promise<string> {
  if (config.graphqlEndpoint)
    return config.graphqlEndpoint

  throw new Error('Failed to determine endpoint for GraphQL server.')
}

/**
 * Handle GraphQL server errors.
 */
function onServerError(error: FetchError) {
  const message = error && 'message' in error ? error.message : ''

  throw createError({
    statusCode: 500,
    statusMessage: `Couldn't execute GraphQL query: ${message}`,
    data: error && 'message' in error ? error.message : error,
  })
}
