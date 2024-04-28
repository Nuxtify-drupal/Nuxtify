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
        name: process.env.NUXT_PUBLIC_SITE_NAME,
        shortName: process.env.NUXT_PUBLIC_MANIFEST_SHORT_NAME,
        backgroundColor: process.env.NUXT_PUBLIC_MANIFEST_BACKGROUND_COLOR,
        themeColor: process.env.NUXT_PUBLIC_MANIFEST_THEME_COLOR,
      },
    },
  },

  app: {
    rootId: 'app',
  },

  routeRules: {
    '/api/**': {
      robots: false,
      sitemap: false,
      cache: false,
      cors: true,
    },
    '/preview/**': {
      robots: false,
      sitemap: false,
      cache: false,
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
    cssPath: '~/base/assets/css/tailwind.css',
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
      './base/queries/**/*.gql',
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
    // Set the full base URL only in production.
    // This will suppress a warning in development.
    baseUrl: (process.env.NODE_ENV !== 'development')
      ? process.env.NUXT_PUBLIC_BASE_URL
      : undefined,
    skipSettingLocaleOnNavigate: true,
    bundle: {
      dropMessageCompiler: true,
      fullInstall: false,
    },
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: false,
    },
    strategy: 'prefix_except_default',

    // Please note that the locales are dynamically loaded in the
    // ./modules/fetch-locales.ts module.
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

  image: {
    domains: [
      process.env.NUXT_PUBLIC_BACKEND_URL ?? '',
    ],
  },
})
