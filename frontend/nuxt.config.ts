import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  typescript: {
    strict: true,
    typeCheck: true,
  },

  runtimeConfig: {
    public: {
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
    },
  },

  app: {
    rootId: 'app',
    pageTransition: {
      enterFromClass: 'opacity-0',
      enterToClass: 'opacity-100',
      leaveFromClass: 'opacity-100',
      leaveToClass: 'opacity-0',
      enterActiveClass: 'transition-opacity',
      leaveActiveClass: 'transition-opacity absolute inset-0',
    },
  },

  routeRules: {
    '/api/**': {
      robots: false,
      sitemap: false,
    },
  },

  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    minify: true,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-graphql-middleware',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
  ],

  tailwindcss: {
    editorSupport: true,
    config: {
      content: [
        './nuxt.config.ts',
        './plugins/**/*.ts',
      ],
    },
  },

  graphqlMiddleware: {
    graphqlEndpoint: `${process.env.NUXT_PUBLIC_BACKEND_URL}/graphql`,
    serverApiPrefix: '/api/graphql',
    autoImportPatterns: [
      './queries/**/*.gql',
    ],
    codegenConfig: {
      flattenGeneratedTypes: true,
      flattenGeneratedTypesIncludeFragments: true,
      skipTypename: false,
      onlyOperationTypes: false,
    },
    codegenSchemaConfig: {
      urlSchemaOptions: {
        headers: {
          token: process.env.BACKEND_API_KEY || '',
        },
      },
    },
  },

  i18n: {
    bundle: {
      dropMessageCompiler: true,
      fullInstall: false,
    },
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
    },
    langDir: 'i18n',
    locales: [
      { code: 'en', iso: 'en', file: 'en.yml' },
      { code: 'nl', iso: 'nl', file: 'nl.yml' },
    ],
    strategy: 'prefix_except_default',
  },

  robots: {
    allow: [
      '/user/login',
      '/user/register',
    ],
    disallow: [
      '/api/*',
      '/user',
    ],
  },

  sitemap: {
    cacheMaxAgeSeconds: 3600,
    sources: [
      '/api/sitemap',
    ],
    exclude: [
      '/api/**',
      '/user',
      '/user/logout',
      '/user/register/confirm',
    ],
    xslColumns: [
      { label: 'URL', width: '67%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '33%' },
    ],
  },
})
