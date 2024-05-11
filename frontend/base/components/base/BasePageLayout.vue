<script setup lang="ts">
import type { NodeUnion, ParagraphUnion } from '#build/graphql-operations'
import type { LayoutSection } from '~/base/types/layout-section'

const props = defineProps({
  page: {
    type: Object as PropType<NodeUnion>,
    required: true,
  },
})

const layout = computed<LayoutSection[]>(() => {
  if (!props.page.layout)
    return []

  const sections: ParagraphUnion[] = props.page.layout.filter(
    item => item.__typename === 'ParagraphLayout',
  )

  sections.forEach((section: LayoutSection) => {
    if (!props.page.layout)
      return

    const children = props.page.layout.filter(
      item => item.composition?.position?.parentId === section.id,
    )

    section.children = {}

    // Add the components to their respective regions.
    for (const child of children) {
      if (!child.composition.position?.region)
        continue

      if (!section.children[child.composition.position.region])
        section.children[child.composition.position.region] = []

      const component = { ...child }

      section.children[child.composition.position.region].push(component)
    }

    // Add empty regions to the layout.
    for (const region of section.composition.layout?.regions || []) {
      if (!section.children[region])
        section.children[region] = []
    }

    // Sort the regions by the order they appear in the layout.
    section.children = Object.fromEntries(
      Object.entries(section.children).sort(([a], [b]) => {
        const aIndex = section.composition.layout?.regions?.indexOf(a) ?? -1
        const bIndex = section.composition.layout?.regions?.indexOf(b) ?? -1

        return aIndex - bIndex
      }),
    )
  })

  return sections
})

const instance = getCurrentInstance()
const defaultComponent = resolveComponent('ParagraphNotImplemented')

function doesComponentExist(component: ParagraphUnion) {
  return !!instance?.appContext.components[component.__typename ?? '']
}

function getDynamicComponent(component: ParagraphUnion) {
  if (component.__typename === 'ParagraphFromLibrary')
    return component.reusableParagraph.paragraphs.__typename

  if (!doesComponentExist(component))
    return defaultComponent

  return component.__typename || 'ParagraphNotImplemented'
}

function getComponentProps(component: ParagraphUnion) {
  if (component.__typename === 'ParagraphFromLibrary') {
    const { __typename, composition, ...sanitisedComponent } = component.reusableParagraph.paragraphs
    return sanitisedComponent
  }

  if (!doesComponentExist(component))
    return { props: { type: component } }

  const { __typename, composition, ...sanitisedComponent } = component
  return sanitisedComponent
}
</script>

<template>
  <div class="flex flex-col max-w-6xl gap-8 m-auto">
    <BasePageTitle v-if="page?.showTitle">
      {{ page?.title }}
    </BasePageTitle>

    <div
      v-for="sections in layout"
      :key="sections.id"
      class="flex flex-wrap gap-8"
    >
      <div
        v-for="(section, section_name) in sections.children"
        :key="section_name"
        class="flex-1"
      >
        <template
          v-for="(component, component_name) in section"
          :key="component_name"
        >
          <component
            :is="getDynamicComponent(component)"
            v-bind="getComponentProps(component)"
          />
        </template>
      </div>
    </div>
  </div>
</template>
