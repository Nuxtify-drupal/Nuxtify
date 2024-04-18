/** @ts-expect-error Due to a bug in the `nuxt-graphql-middleware` package, we cannot import the type. */
import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'

import type { H3Event } from 'h3'

export default defineGraphqlServerOptions({
  async serverFetchOptions(event: H3Event, operation?: string, operationName?: string) {
    const baseServerOptions = await import('~/base/app/graphqlMiddleware.serverOptions').then(module => module.default)
    return baseServerOptions.serverFetchOptions(event, operation, operationName)
  },
})
