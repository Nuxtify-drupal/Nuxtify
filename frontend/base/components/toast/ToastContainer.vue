<script setup lang="ts">
const { toasts, removeToast } = useToast()
</script>

<template>
  <div
    v-if="toasts.length"
    class="fixed bottom-0 z-50 flex flex-col items-center w-full -translate-x-1/2 sm:w-auto left-1/2"
  >
    <div
      class="flex flex-col-reverse gap-4 m-4 max-w-96 sm:min-w-96"
    >
      <ToastItem
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @close="removeToast(toast.id)"
      />
    </div>
  </div>
</template>
