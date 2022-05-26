<template>
  <article class="article-card" :id="article.id">
    <div class="time-container">
      <time class="time">{{ article.publishDate }}</time>
    </div>
    <div>
      <h4 class="title">{{ article.title }}</h4>
      <p class="content-preview">{{ article.contentPreview }}</p>
      <NuxtLink class="link flex items-center" :to="`/blog/${article.slug}`">
        <span>Read this article</span>
        <Icon icon="chevron-right" size="20" />
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { IArticle } from "~/types/article";

defineProps<{ article: IArticle }>();
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
