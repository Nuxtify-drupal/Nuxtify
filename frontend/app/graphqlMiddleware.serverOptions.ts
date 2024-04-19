/** @ts-expect-error Due to a bug in the `nuxt-graphql-middleware` package, we cannot import the type. */
import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'
import type { H3Event } from 'h3'
import baseServerOptions from '~/base/app/graphqlMiddleware.serverOptions'

export default defineGraphqlServerOptions({
  serverFetchOptions(event: H3Event, operation?: string, operationName?: string) {
    return baseServerOptions.serverFetchOptions(event, operation, operationName)
  },
})
