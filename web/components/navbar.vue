<template>
  <header class="header">
    <div class="brand">
      <NuxtLink to="/">
        <img
          alt="Ahmed Kamal"
          class="brand-img"
          src="/assets/images/ahmedmkamal.jpg"
        />
      </NuxtLink>
      <div>
        <NuxtLink class="brand-name" to="/">Ahmed Kamal</NuxtLink>
        <nav class="nav">
          <NuxtLink active-class="active-link" class="nav-link" to="/blog">
            BLOG
          </NuxtLink>
          <NuxtLink active-class="active-link" class="nav-link" to="/projects">
            PROJECTS
          </NuxtLink>
          <NuxtLink active-class="active-link" class="nav-link" to="/contact">
            CONTACT
          </NuxtLink>
        </nav>
      </div>
    </div>
    <button class="dark-mode-toggle" @click="toggleDarkMode">
      <Icon :icon="theme === 'dark' ? 'sun' : 'moon'" />
    </button>
  </header>
</template>

<script setup lang="ts">
import { onMounted, useState } from "#imports";

const theme = useState("theme", () => "light");

function toggleDarkMode() {
  const oldTheme = theme.value;
  theme.value = oldTheme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme.value);
  if (document.body.classList.contains(oldTheme)) {
    document.body.classList.replace(oldTheme, theme.value);
  } else {
    document.body.classList.add(theme.value);
  }
}

onMounted(() => {
  if (localStorage.getItem("theme") === "dark") {
    toggleDarkMode();
  }
});
</script>

<style scoped lang="scss">
.header {
  @apply flex items-center justify-between w-full py-12;
}

.brand {
  @apply flex items-center gap-6;
}

.brand-img {
  @apply block w-24 h-24 rounded-full object-cover;
}

.brand-name {
  @apply block text-2xl font-bold mb-2;
}

.nav {
  @apply flex items-center gap-3;
}

.nav-link {
  @apply text-zinc-500 dark:text-zinc-400 text-sm font-medium;
  &:hover {
    @apply text-zinc-800 dark:text-zinc-200;
  }
}

.active-link {
  @apply underline text-zinc-800 dark:text-zinc-200;
}

.dark-mode-toggle {
  @apply p-2 rounded-lg border border-zinc-300 dark:border-zinc-700;
  &:hover {
    @apply bg-zinc-200 dark:bg-zinc-800;
  }
}
</style>
