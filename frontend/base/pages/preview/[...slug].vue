<script setup lang="ts">
import type { NodeUnion } from '#build/graphql-operations'

const { finalizePendingLocaleChange } = useI18n()

// Finalize the pending locale change before fetching the route data.
await finalizePendingLocaleChange()

definePageMeta({
  layout: 'preview',
})

const config = useRuntimeConfig()

if (process.client) {
  const { height: windowHeight } = useElementSize(document.body)

  watch(
    windowHeight,
    () => {
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

const { data } = await useAsyncData(
  'routePreview',
  async () => await useGraphqlQuery(
    'routePreview',
    {
      id: `${path.value}`,
      token: token.value,
    },
  ),
)

if (data.value?.data === null)
  showError({ statusCode: 404, statusMessage: 'Not Found' })

const page = ref<NodeUnion | undefined>(undefined)

function setPageData() {
  page.value = data.value?.data?.preview as NodeUnion || undefined
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
