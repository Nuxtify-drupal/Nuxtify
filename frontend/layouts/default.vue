<script setup lang="ts"></script>

<template>
  <div class="flex flex-col justify-between min-h-screen gap-8">
    <LayoutHeader />

    <main class="relative flex-1 w-full mx-auto px-4">
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>
