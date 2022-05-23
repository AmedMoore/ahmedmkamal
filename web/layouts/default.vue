<template>
  <div class="layout">
    <div class="layout-content">
      <Navbar />
      <main class="page-content">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#head";

useHead({
  charset: "UTF-8",
  title: "Ahmed Kamal",
  viewport:
    "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0",
  meta: [
    { name: "description", content: "Ahmed Kamal (@ahmedmkamal)." },
    { name: "keywords", content: "Ahmed Kamal, @ahmedmkamal, @akaahmedkamal" },
  ],
});
</script>

<style scoped lang="scss">
.layout {
  @apply flex min-h-screen justify-center;
}

.layout-content {
  @apply flex flex-col flex-1 max-w-[720px];
}

.page-content {
  @apply flex-1;
}
</style>
