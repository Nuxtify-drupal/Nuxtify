<template>
  <div class="flex flex-col justify-between flex-1 gap-8">
    <LayoutHeader />

    <main
      id="main-content"
      class="flex-1 w-full px-4 mx-auto md:px-8"
    >
      <slot />
    </main>

    <LayoutFooter />
  </div>
</template>
