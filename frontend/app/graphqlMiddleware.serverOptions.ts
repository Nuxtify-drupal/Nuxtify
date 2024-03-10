import process from 'node:process'
import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'

export default defineGraphqlServerOptions({
  serverFetchOptions(_event) {
    return {
      headers: {
        token: process.env.BACKEND_API_KEY || '',
      },
    }
  },
})
