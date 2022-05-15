<template>
  <footer class="footer">
    <div class="footer__container">
      <p>&copy; {{ year }} Ahmed Kamal.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
.footer {
  @apply flex justify-center w-full;
}
.footer__container {
  @apply flex flex-1 items-center justify-center container px-12 py-6;
}
</style>
