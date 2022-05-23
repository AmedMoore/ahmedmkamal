<template>
  <footer class="p-4">
    <div class="text-center">
      <p class="text-sm text-gray-500">&copy; {{ year }} Ahmed Kamal.</p>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
