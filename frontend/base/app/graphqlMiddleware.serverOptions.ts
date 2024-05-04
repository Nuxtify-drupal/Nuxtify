import process from 'node:process'

/** @ts-expect-error Due to a bug in the `nuxt-graphql-middleware` package, we cannot import the type. */
import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'
import type { H3Event } from 'h3'
import type { FetchError, FetchOptions, FetchResponse } from 'ofetch'

import { timestamp } from '@vueuse/core'
import serverOptions from '#graphql-middleware-server-options-build'

enum GraphqlMiddlewareOperation {
  Query = 'query',
  Mutation = 'mutation',
}

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
    event: H3Event,
    _operation?: string,
    _operationName?: string,
  ) {
    const { headers } = event

    if (headers.has('Authorization')) {
      if (!headers.get('Authorization')?.startsWith('Basic ')) {
        return {
          headers: {
            Authorization: headers.get('Authorization') || '',
          },
        }
      }
    }

    const token = process.env.BACKEND_API_KEY || ''

    return {
      headers: {
        token,
      },
    }
  },

  async doGraphqlRequest({
    event,
    operation,
    operationName,
    operationDocument,
    variables,
  }: {
    event: H3Event
    operation: GraphqlMiddlewareOperation
    operationName: string
    operationDocument: string
    variables: Record<string, any>
  }) {
    const url = new URL(`${process.env.NUXT_PUBLIC_BASE_URL}${event._path}`)

    if (await storage.hasItem(getCacheKey(url))) {
      const cachedData = await storage.getItem<CacheData>(getCacheKey(url))
      const now = timestamp()

      if (cachedData && now - cachedData.timestamp < 3600000)
        return cachedData.data

      await storage.removeItem(getCacheKey(url))
    }

    const runtimeConfig = useRuntimeConfig().graphqlMiddleware

    const endpoint = await getEndpoint(
      runtimeConfig,
      serverOptions,
      event,
      operation,
      operationName,
    )

    const fetchOptions = await getFetchOptions(
      serverOptions,
      event,
      operation,
      operationName,
    )

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
      .then((response) => {
        return onServerResponse(
          serverOptions,
          event,
          response,
          operation,
          operationName,
        )
      })
      .catch((error) => {
        return onServerError(
          serverOptions,
          event,
          error,
          operation,
          operationName,
        )
      })
  },

  async onServerResponse(event: H3Event, response: Response) {
    if (Math.floor(response.status / 100) !== 2)
      event.respondWith(response)

    const data = {
      // @ts-expect-error The `_data` property is not defined in the `Response` type.
      data: response._data,
      timestamp: timestamp(),
    }

    const url = new URL(`${process.env.NUXT_PUBLIC_BASE_URL}${event._path}`)

    await storage.setItem<CacheData>(getCacheKey(url), data)

    return data.data
  },
})

/**
 * Get the URL of the GraphQL endpoint.
 */
function getEndpoint(
  config: any,
  serverOptions: any,
  event: H3Event,
  operation: GraphqlMiddlewareOperation,
  operationName: string,
): string | Promise<string> {
  if (serverOptions.graphqlEndpoint) {
    const result = serverOptions.graphqlEndpoint(
      event,
      operation,
      operationName,
    )

    if (result)
      return Promise.resolve(result)
  }
  if (config.graphqlEndpoint)
    return config.graphqlEndpoint

  throw new Error('Failed to determine endpoint for GraphQL server.')
}

/**
 * Get the options for the $fetch request to the GraphQL server.
 */
function getFetchOptions(
  serverOptions: any,
  event: H3Event,
  operation: GraphqlMiddlewareOperation,
  operationName: string,
): FetchOptions | Promise<FetchOptions> {
  if (serverOptions.serverFetchOptions) {
    return (
      serverOptions.serverFetchOptions(event, operation, operationName) || {}
    )
  }

  return {}
}

/**
 * Handle GraphQL server response.
 */
function onServerResponse(
  serverOptions: any,
  event: H3Event,
  response: FetchResponse<any>,
  operation?: string,
  operationName?: string,
) {
  if (serverOptions.onServerResponse) {
    return serverOptions.onServerResponse(
      event,
      response,
      operation,
      operationName,
    )
  }

  return response._data
}

/**
 * Handle GraphQL server errors.
 */
function onServerError(
  serverOptions: any,
  event: H3Event,
  error: FetchError,
  operation?: string,
  operationName?: string,
) {
  if (serverOptions.onServerError)
    return serverOptions.onServerError(event, error, operation, operationName)

  const message = error && 'message' in error ? error.message : ''
  throw createError({
    statusCode: 500,
    statusMessage: `Couldn't execute GraphQL query: ${message}`,
    data: error && 'message' in error ? error.message : error,
  })
}
