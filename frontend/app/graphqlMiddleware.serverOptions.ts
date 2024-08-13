import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'
import type { H3Event } from 'h3'
import baseServerOptions from '~/base/app/graphqlMiddleware.serverOptions'

export default defineGraphqlServerOptions({
  serverFetchOptions(event, operation, operationName) {
    if (!baseServerOptions.serverFetchOptions)
      return {}

    return baseServerOptions.serverFetchOptions(event, operation, operationName)
  },

  async doGraphqlRequest({ event, operation, operationName, operationDocument, variables }) {
    if (!baseServerOptions.doGraphqlRequest)
      return

    return await baseServerOptions.doGraphqlRequest({ event, operation, operationName, operationDocument, variables })
  },

  async onServerResponse(event, response) {
    if (!baseServerOptions.onServerResponse)
      return

    return await baseServerOptions.onServerResponse(event, response)
  },
})
