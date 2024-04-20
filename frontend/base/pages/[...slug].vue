<script setup lang="ts">
import type { NodeUnion, RouteInternal } from '#build/graphql-operations'

const { finalizePendingLocaleChange } = useI18n()

// Finalize the pending locale change before fetching the route data.
await finalizePendingLocaleChange()

const config = useRuntimeConfig()

const route = useRoute()
const { locale } = useI18n()

const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : ''
const path = ref<string>(slug)

const { data } = await useAsyncData(
  'route',
  async () => await useGraphqlQuery(
    'route',
    {
      path: `/${path.value}`,
      langcode: locale.value,
    },
  ),
)

if (data.value?.data?.route === null)
  showError({ statusCode: 404, statusMessage: 'Not Found' })

const page = ref<NodeUnion | undefined>(undefined)

function setPageData() {
  page.value = (data.value?.data?.route as RouteInternal)?.entity as NodeUnion || undefined
}

setPageData()

const unwatchData = watch(data, () => {
  setPageData()
})

onBeforeRouteUpdate((to, from) => {
  if (to.fullPath !== from.fullPath)
    unwatchData()
})

onBeforeRouteLeave(() => {
  unwatchData()
})

const i18nRoutes = computed(() => {
  const routes: { [key: string]: { slug: string } } = {}

  for (const translation of Object.values(page.value?.translations ?? {})) {
    if (!translation.langcode.id || !translation.path)
      continue

    const slug = translation.path
      .split('/')
      .filter(Boolean)
      .filter(part => part !== translation.langcode.id)
      .join('/')

    routes[translation.langcode.id] = { slug }
  }

  // Remove the slug for the home page
  if (`/${routes.en.slug}` === data.value?.data.info.home) {
    for (const [langcode] of Object.entries(routes))
      routes[langcode].slug = ''
  }

  return routes
})

const setI18nParams = useSetI18nParams()
setI18nParams({
  ...i18nRoutes.value,
})

const { meta, link } = (page.value?.metatag ?? []).reduce(
  (acc, tag) => {
    const tagType = tag.tag as keyof typeof acc
    const tagAttributes = { ...tag.attributes }

    if ('rel' in tagAttributes && tagAttributes.rel === 'canonical')
      tagAttributes.href = config.public.baseUrl + tagAttributes.href

    if (tagType in acc)
      acc[tagType].push(tagAttributes)

    return acc
  },
  {
    meta: [] as any[],
    link: [] as any[],
    value: [] as any[],
  },
)

useHead({
  title: page.value?.title,
  meta: [
    ...meta,
  ],
  link: [
    ...link,
  ],
})
</script>

<template>
  <BasePageLayout
    v-if="page"
    :page="page"
  />
</template>
