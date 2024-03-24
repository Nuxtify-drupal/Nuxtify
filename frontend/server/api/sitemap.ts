import process from 'node:process'
import type { SitemapQuery } from '#build/graphql-operations'

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const locales = config.public.i18n.locales

  const itemsPerPage = 100

  const pages = []

  for (const locale of Object.keys(locales)) {
    let hasNextPage = true
    let cursor = '0'

    do {
      const { data }: { data: SitemapQuery } = await $fetch('/api/graphql/query/sitemap', {
        query: {
          __variables: JSON.stringify({
            first: itemsPerPage,
            langcode: locale,
            after: cursor,
          }),
        },
      })

      hasNextPage = data.nodeBasicPages.pageInfo.hasNextPage
      cursor = data.nodeBasicPages.pageInfo.endCursor

      pages.push(data.nodeBasicPages.edges.map((edge) => {
        return {
          loc: edge.node.path,
          lastmod: edge.node.changed.time,
          priority: 1,
          _sitemap: locale,
        }
      }))
    }
    while (hasNextPage)
  }

  return pages.flat()
})
