import Vue3Toastify, { type ToastContainerOptions, toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    clearOnUrlChange: false,
    hideProgressBar: true,
    pauseOnHover: false,
  } as ToastContainerOptions)

  return {
    provide: {
      toast,
    },
  }
})
