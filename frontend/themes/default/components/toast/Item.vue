<script setup lang="ts">
const props = defineProps({
  toast: {
    type: Object as PropType<Toast>,
    required: true,
  },
  onClose: {
    type: Function as PropType<() => void>,
    required: true,
  },
  timeout: {
    type: Number,
    default: 5000,
  },
})

const timeout = ref(props.timeout)

const { pause, resume } = useRafFn(({ delta }) => {
  if (timeout.value <= 0) {
    props.onClose()
    return
  }

  timeout.value -= delta
}, {
  fpsLimit: 60,
})

const focus = useWindowFocus()

watch(focus, () => {
  if (focus.value)
    resume()
  else
    pause()
})
</script>

<template>
  <div
    class="flex gap-2 p-4 bg-white border rounded-lg shadow-lg dark:bg-stone-800 dark:border-stone-700"
  >
    <Icon
      v-if="toast.icon"
      class="w-6 h-6 mt-1 shrink-0"
      :name="toast.icon"
    />

    {{ toast.message }}

    <Icon
      class="w-6 h-6 -mt-2 -mr-2 cursor-pointer shrink-0"
      name="mdi:close"
      @click="onClose"
    />
  </div>
</template>
