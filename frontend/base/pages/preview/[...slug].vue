<script setup lang="ts">
import type { NodeUnion, RouteInternal } from '#build/graphql-operations'

const { finalizePendingLocaleChange } = useI18n()

// Finalize the pending locale change before fetching the route data.
await finalizePendingLocaleChange()

const { locale } = useI18n()

definePageMeta({
  layout: 'preview',
})

const config = useRuntimeConfig()

if (process.client) {
  const { height: windowHeight } = useElementSize(document.body)

  watch(
    windowHeight,
    () => {
      if (windowHeight.value <= 0)
        return

      window.parent.postMessage(
        { name: 'setFrameHeight', height: windowHeight.value },
        config.public.backendUrl,
      )
    },
    { immediate: true },
  )
}

const route = useRoute()

const slug = route.params.slug
const path = ref<string>(slug[0] || '' as string)
const token = ref<string>(slug[1] || '' as string)

const data = ref<NodeUnion | undefined>(undefined)

if (path.value && token.value && path.value !== 'node') {
  const { data: previewData } = await useAsyncData(
    'routePreview',
    async () => await useGraphqlQuery(
      'routePreview',
      {
        id: `${path.value}`,
        token: token.value,
      },
    ),
  )

  data.value = previewData.value?.data.preview as NodeUnion
}
else {
  path.value = Array.isArray(route.params.slug) ? route.params.slug.join('/') : ''

  const { data: pageData } = await useAsyncData(
    'routePreview',
    async () => await useGraphqlQuery(
      'route',
      {
        path: `/${path.value}`,
        langcode: locale.value,
      },
    ),
  )

  data.value = (pageData.value?.data.route as RouteInternal)?.entity as NodeUnion
}

if (data.value === null)
  showError({ statusCode: 404, statusMessage: 'Not Found' })

const page = ref<NodeUnion | undefined>(undefined)

function setPageData() {
  page.value = data.value || undefined
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
</script>

<template>
  <BasePageLayout
    v-if="page"
    :page="page"
  />
</template>
