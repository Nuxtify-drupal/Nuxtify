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
</script>

<template>
  <div class="flex flex-col max-w-6xl gap-8 m-auto">
    <BasePageTitle v-if="page?.showTitle">
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
            v-if="component.__typename !== 'ParagraphFromLibrary'"
            v-bind="component"
          />

          <component
            :is="component.reusableParagraph.paragraphs.__typename"
            v-else-if="component.__typename === 'ParagraphFromLibrary'"
            v-bind="component.reusableParagraph.paragraphs"
          />
        </div>
      </div>
    </div>
  </div>
</template>
