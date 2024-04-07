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
      manifest: {
        name: process.env.NUXT_PUBLIC_MANIFEST_NAME,
        shortName: process.env.NUXT_PUBLIC_MANIFEST_SHORT_NAME,
        backgroundColor: process.env.NUXT_PUBLIC_MANIFEST_BACKGROUND_COLOR,
        themeColor: process.env.NUXT_PUBLIC_MANIFEST_THEME_COLOR,
      },
    },
  },

  css: [
    'vue3-toastify/dist/index.css',
  ],

  app: {
    rootId: 'app',
  },

  routeRules: {
    '/api/**': {
      robots: false,
      sitemap: false,
      cors: true,
    },
    '/preview/**': {
      robots: false,
      sitemap: false,
      security: {
        headers: {
          contentSecurityPolicy: {
            'frame-ancestors': `'self' ${process.env.NUXT_PUBLIC_BACKEND_URL}`,
          },
        },
      },
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
    'nuxt-security',
    '@nuxt/image',
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
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    skipSettingLocaleOnNavigate: true,
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
      '/user',
      '/user/logout',
      '/user/register/confirm',
    ],
    xslColumns: [
      { label: 'URL', width: '67%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '33%' },
    ],
    xslTips: false,
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',

      // Do not upgrade insecure requests in development.
      // Fixes an issue in Safari where the browser would block requests.
      contentSecurityPolicy: {
        'upgrade-insecure-requests': (process.env.NODE_ENV !== 'development'),
      },
    },

    rateLimiter: false,
    removeLoggers: false,
  },
})
