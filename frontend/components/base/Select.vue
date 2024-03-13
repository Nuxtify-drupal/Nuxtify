<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
})

defineEmits([
  'update:modelValue',
])

const model = defineModel()
const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true
})
</script>

<template>
  <div class="relative">
    <select
      v-model="model"
      :aria-label="label"
      :class="{
        'opacity-0': !isLoaded,
        'pointer-events-none': !isLoaded,
      }"
    >
      <slot />
    </select>

    <SkeletonPlaceholderSingle
      v-if="!isLoaded"
      class="absolute inset-0"
      max-height="1rem"
    />
  </div>
</template>
