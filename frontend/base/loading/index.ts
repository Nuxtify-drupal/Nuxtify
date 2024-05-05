import fs from 'node:fs'

const html = String.raw

const normalizeCss = fs.readFileSync('./base/loading/normalize.css', 'utf8')
const mainCss = fs.readFileSync('./base/loading/index.css', 'utf8')

let css = `${normalizeCss} ${mainCss}`

css = css.replaceAll(/\s+/g, ' ').replaceAll(/\/\*.+?\*\//g, '')

const logo = fs.readFileSync('./base/public/logo.svg', 'base64')

interface Data {
  loading?: string
  appName: string
}

export default (data: Data) => {
  const templateHtml = html`
<!DOCTYPE html>
<html class="h-full" lang="en">
  <head>
    <title>${data.loading} | ${data.appName}</title>

    <meta charset="utf-8">
    <meta
      content="width=device-width,initial-scale=1.0,minimum-scale=1.0"
      name="viewport"
    >

    <style>${css}</style>
  </head>

  <body class="h-full">

    <div class="flex flex-col h-full items-center justify-center">
      <a
        href="https://github.com/Dobefu/nuxtify"
        target="_blank"
        rel="noopener"
      >
        <img
          class="logo w-full"
          src="data:image/svg+xml;base64,${logo}"
          alt="Logo"
        />
      </a>

      <div class="flex items-center gap-8">
        <div class="throbber"></div>
        ${data.loading}
      </div>
    </div>

    <script>
      if (typeof window.fetch === 'undefined') {
        setTimeout(() => window.location.reload(), 1000)
      }
      else {
        const check = async () => {
          try {
            const body = await window.fetch(window.location.href)
              .then(r => r.text())

            if (!body.includes('__NUXT_LOADING__'))
              return window.location.reload()
          }
          catch  {}

          setTimeout(check, 1000)
        }
        check()
      }

      const resizeObserver = new ResizeObserver(entries => {
        window.parent.postMessage(
          { name: 'setFrameHeight', height: entries[0].target.scrollHeight },
          '${data.backendUrl}',
        )
      })

      resizeObserver.observe(document.documentElement)
    </script>
  </body>
</html>
`

  return templateHtml
}
