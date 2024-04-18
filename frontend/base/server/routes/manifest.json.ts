export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()

  return {
    short_name: config.public.manifest.shortName ?? '',
    name: config.public.manifest.name ?? '',
    orientation: 'any',
    start_url: '/',
    scope: '/',
    id: '/',
    background_color: config.public.manifest.backgroundColor ?? '',
    theme_color: config.public.manifest.themeColor ?? '',
    display: 'standalone',
    icons: [
      {
        src: '/logo.svg',
        type: 'image/svg+xml',
        sizes: '512x512',
        purpose: 'any',
      },
      {
        src: '/logo-128.png',
        type: 'image/png',
        sizes: '128x128',
        purpose: 'any',
      },
      {
        src: '/logo-maskable-128.png',
        type: 'image/png',
        sizes: '128x128',
        purpose: 'maskable',
      },
      {
        src: '/logo-192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'any',
      },
      {
        src: '/logo-maskable-192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/logo-512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any',
      },
      {
        src: '/logo-maskable-512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
  }
})
