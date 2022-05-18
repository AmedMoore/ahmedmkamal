<template>
  <div class="layout">
    <Navbar />
    <main class="layout__content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
useHead({
  title: "Ahmed Kamal",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  charset: "UTF-8",
  meta: [
    {
      name: "description",
      content: "Ahmed Kamal (@ahmedmkamal) portfolio and blog.",
    },
  ],
});
</script>

<style scoped lang="scss">
.layout {
  @apply flex flex-col min-h-screen items-center;
}
.layout__content {
  @apply flex-1 px-12 py-6 container;
}
</style>
