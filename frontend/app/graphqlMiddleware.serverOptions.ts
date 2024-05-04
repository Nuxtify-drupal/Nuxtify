/** @ts-expect-error Due to a bug in the `nuxt-graphql-middleware` package, we cannot import the type. */
import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'
import type { H3Event } from 'h3'
import baseServerOptions from '~/base/app/graphqlMiddleware.serverOptions'

export default defineGraphqlServerOptions({
  serverFetchOptions(event: H3Event, operation?: string, operationName?: string) {
    return baseServerOptions.serverFetchOptions(event, operation, operationName)
  },

  async doGraphqlRequest({ event, operation, operationName, operationDocument, variables }: { event: H3Event, operation: any, operationName: string, operationDocument: string, variables: Record<string, any> }) {
    return await baseServerOptions.doGraphqlRequest({ event, operation, operationName, operationDocument, variables })
  },

  async onServerResponse(event: H3Event, response: Response) {
    return await baseServerOptions.onServerResponse(event, response)
  },
})
