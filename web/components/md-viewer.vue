<template>
  <div class="mdit" v-html="$mdit.render(content)" />
</template>

<script setup lang="ts">
import "highlight.js/styles/github-dark-dimmed.css";

defineProps<{ content: string }>();
</script>

<style lang="scss">
.mdit {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-semibold mb-4;
  }
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }
  h4 {
    @apply text-base;
  }
  h5 {
    @apply text-sm;
  }
  h6 {
    @apply text-xs;
  }

  p {
    @apply mb-4 text-base text-zinc-700 dark:text-zinc-300;
  }

  a {
    @apply underline text-blue-500;
  }

  code:not(.hljs) {
    @apply bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-1 py-0.5 text-xs rounded-md font-mono;
  }

  pre {
    @apply p-1 mb-4 flex;

    code {
      @apply text-sm font-mono;
    }

    .copy-btn {
      @apply hidden absolute right-3 top-3 p-1.5 bg-zinc-700 border border-zinc-600 hover:bg-zinc-600 rounded-md;
    }

    &:hover {
      .copy-btn {
        @apply flex;
      }
    }
  }

  blockquote {
    @apply p-2 mb-4 bg-zinc-200 dark:bg-zinc-800 border-l-4 border-zinc-400 dark:border-zinc-500;

    p {
      @apply mb-0 text-sm italic text-zinc-500 dark:text-zinc-400;
    }
  }

  ul {
    @apply list-disc pl-6;
  }

  ol {
    @apply list-decimal pl-6;
  }
}
</style>
