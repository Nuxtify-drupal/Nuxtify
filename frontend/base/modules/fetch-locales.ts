import process from 'node:process'
import { defineNuxtModule } from '@nuxt/kit'

interface Language {
  id: string
  name: string
  direction: string
}

export default defineNuxtModule({
  async setup(options, nuxt) {
    const query = `{
      info {
        languages {
          id
          name
          direction
        }
      }
    }`.replace(/\s+/g, ' ')

    const response = await fetch(
      `${process.env.NUXT_PUBLIC_BACKEND_URL}/graphql?query=${query}`,
      {
        headers: {
          token: process.env.BACKEND_API_KEY ?? '',
        },
      },
    )

    if (!response.ok)
      throw new Error('Failed to fetch languages. Is BACKEND_API_KEY set correctly?')

    const { data } = await response.json()

    if (!data)
      throw new Error('Failed to parse languages')

    const languages = data.info.languages.map((language: Language) => ({
      code: language.id,
      iso: language.id,
      file: `${language.id}.yml`,
      dir: language.direction,
      name: language.name,
    }))

    nuxt.options.i18n ||= {}
    nuxt.options.i18n.langDir = './i18n'
    nuxt.options.i18n.locales = languages
  },
})
