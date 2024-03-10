import type { ParagraphUnion } from '#build/graphql-operations'

type LayoutSection = ParagraphUnion & {
  children?: { [key: string]: any }
}
