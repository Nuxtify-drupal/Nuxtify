<script setup lang="ts"></script>

<template>
  <header class="px-4">
    <div class="m-auto max-w-5xl">
      HEADER
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/nl">
        NL
      </NuxtLink>
      <NuxtLink to="/nl/some/complex/path">
        Some complex path
      </NuxtLink>
    </div>
  </header>
</template>
