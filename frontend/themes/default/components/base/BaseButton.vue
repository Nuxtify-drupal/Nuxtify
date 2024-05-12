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
  to: {
    type: String,
    default: undefined,
  },
})

const { t } = useI18n()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    class="gap-2 px-4 py-3 text-sm font-semibold text-white transition-all bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none hover:shadow-lg"
    :disabled="loading || undefined"
    :to="to || undefined"
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
  </component>
</template>
