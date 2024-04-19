import process from 'node:process'

/** @ts-expect-error Due to a bug in the `nuxt-graphql-middleware` package, we cannot import the type. */
import { defineGraphqlServerOptions } from 'nuxt-graphql-middleware/dist/runtime/serverOptions'

import type { H3Event } from 'h3'

export default defineGraphqlServerOptions({
  serverFetchOptions(event: H3Event, _operation?: string, _operationName?: string) {
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
})
