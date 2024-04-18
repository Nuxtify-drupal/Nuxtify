import Vue3Toastify, { type ToastContainerOptions, toast } from 'vue3-toastify'

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
