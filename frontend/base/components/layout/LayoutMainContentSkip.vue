<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Teleport to="body">
    <a
      href="#main-content"
      class="absolute z-50 p-2 text-center -translate-x-1/2 left-1/2 -top-16 focus:top-0"
    >
      {{ t('skip_to_main_content') }}
    </a>
  </Teleport>
</template>
