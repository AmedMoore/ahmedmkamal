<template>
  <article class="article-card" :id="post.id">
    <div class="time-container">
      <time class="time">{{ post.publishDate }}</time>
    </div>
    <div>
      <h4 class="title">{{ post.title }}</h4>
      <p class="content-preview">{{ post.contentPreview }}</p>
      <a class="link flex items-center" :href="`/blog/${post.slug}`">
        <span>Read this article</span>
        <Icon icon="chevron-right" size="20" />
      </a>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Post } from "~/models/post";

defineProps<{ post: Post }>();
</script>

<style scoped lang="scss">
.article-card {
  @apply flex mb-10 gap-2;
}

.time-container {
  @apply min-w-max;
}

.time {
  @apply text-sm text-zinc-400 dark:text-zinc-500;
}

.title {
  @apply text-lg font-semibold;
}

.content-preview {
  @apply text-base font-medium text-zinc-600 dark:text-zinc-400;
}
</style>
