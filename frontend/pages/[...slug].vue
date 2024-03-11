<script setup lang="ts">
import type { NodeUnion, RouteInternal } from '#build/graphql-operations'
import type { LayoutSection } from '~/types/layout-section'

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
let layout = reactive<LayoutSection[]>([])

function setPageData() {
  page.value = (data.value?.data?.route as RouteInternal)?.entity || undefined

  layout = formatLayout(page.value?.layout || [])
}

setPageData()

const unwatchData = watch(data, () => {
  setPageData()
})

onBeforeRouteUpdate((to, from) => {
  if (to.fullPath !== from.fullPath)
    unwatchData()
})

useHead({
  title: page.value?.title,
  meta: [
    {
      name: 'description',
      content: '', // TODO: Add description
    },
  ],
})
</script>

<template>
  <div class="max-w-5xl m-auto flex flex-col gap-8">
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
