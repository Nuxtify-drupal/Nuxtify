<script setup lang="ts">
const { toasts, removeToast } = useToast()

const isToastsShown = ref(false)

watch(toasts, () => {
  if (toasts.value.length > 0)
    isToastsShown.value = true
}, {
  deep: true,
})

function onToastLeave(el: Element) {
  if (el instanceof HTMLElement === false)
    return

  const { top, width } = el.getBoundingClientRect()
  const { top: offsetTop } = el.parentElement!.getBoundingClientRect()

  el.style.top = `${top - offsetTop}px`
  el.style.width = `${width}px`
  el.style.position = 'fixed'
}

function onAfterToastLeave() {
  if (toasts.value.length === 0)
    isToastsShown.value = false
}
</script>

<template>
  <div
    v-if="isToastsShown"
    class="fixed bottom-0 z-50 flex flex-col items-center w-full -translate-x-1/2 sm:w-auto left-1/2"
  >
    <TransitionGroup
      appear
      name="toast"
      tag="div"
      class="flex flex-col-reverse gap-4 m-4 max-w-96 sm:min-w-96"
      enter-from-class="translate-y-full opacity-0"
      leave-to-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      enter-active-class="transition-all -z-50"
      leave-active-class="transition-all -z-50"
      move-class="transition-all"
      @before-appear="isToastsShown = true"
      @leave="onToastLeave"
      @after-leave="onAfterToastLeave"
    >
      <ToastItem
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @close="removeToast(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>
