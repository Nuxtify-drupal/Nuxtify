<script setup lang="ts">
import type { NodeUnion, RouteInternal } from '#build/graphql-operations'
import type { LayoutSection } from '~/types/layout-section'

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
let layout = reactive<LayoutSection[]>([])

function setPageData() {
  page.value = data.value?.data?.preview as NodeUnion || undefined

  layout = formatLayout(page.value?.layout || [])
}

setPageData()

const unwatchData = watch(data, () => {
  setPageData()
})

onBeforeRouteLeave((to, from) => {
  if (to.name !== from.name)
    unwatchData()
})
</script>

<template>
  <div class="flex flex-col max-w-6xl gap-8 m-auto">
    <BasePageTitle>
      {{ page?.title }}
    </BasePageTitle>

    <div
      v-for="sections in layout"
      :key="sections.id"
      class="flex flex-wrap"
    >
      <div
        v-for="(section, section_name) in sections.children"
        :key="section_name"
        class="flex-1"
      >
        <div
          v-for="(component, component_name) in section"
          :key="component_name"
        >
          <component
            :is="component.__typename"
            v-bind="component"
          />
        </div>
      </div>
    </div>
  </div>
</template>
