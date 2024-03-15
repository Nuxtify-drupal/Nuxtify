<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()
</script>

<template>
  <button
    class="px-4 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
    :disabled="loading || undefined"
  >
    <span
      v-if="loading"
      :aria-label="t('loading')"
    >
      <Icon
        class="mr-2 animate-spin"
        name="mdi:loading"
      />
    </span>
    <slot />
  </button>
</template>
