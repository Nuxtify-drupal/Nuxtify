<template>
  <Teleport to="body">
    <a
      href="#main-content"
      class="absolute z-50 px-4 py-2 text-center transition-all -translate-x-1/2 bg-white shadow-lg rounded-b-xl left-1/2 -top-16 focus:top-0 dark:bg-zinc-950"
    >
      {{ $t('skip_to_main_content') }}
    </a>
  </Teleport>
</template>
