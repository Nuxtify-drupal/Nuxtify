import type { ParagraphUnion } from '#build/graphql-operations'
import type { LayoutSection } from '~/types/layout-section'

export default function formatLayout(layout: ParagraphUnion[]): ParagraphUnion[] {
  if (!layout)
    return []

  const sections: ParagraphUnion[] = layout.filter(
    item => item.__typename === 'ParagraphLayout',
  )

  sections.forEach((section: LayoutSection) => {
    const children = layout.filter(
      item => item.composition?.position?.parentId === section.id,
    )

    section.children = {}

    for (const child of children) {
      if (!child.composition.position?.region)
        continue

      if (!section.children[child.composition.position.region])
        section.children[child.composition.position.region] = []

      const component = { ...child } as any
      delete component.composition

      section.children[child.composition.position.region].push(component)
    }
  })

  return sections
}
