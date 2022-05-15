<template>
  <article class="article">
    <div class="article__time">
      <time>{{ post.publishDate }}</time>
      <VueFeather type="minus" size="20" />
    </div>
    <div class="article__content">
      <h1 class="article__title">{{ post.title }}</h1>
      <p class="article__preview">{{ post.preview }}</p>
      <Link :href="`/blog/${post.slug}`">Read more</Link>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Post } from "~/models/post";
import VueFeather from "vue-feather";

defineProps<{ post: Post }>();
</script>

<style scoped>
.article {
  @apply flex gap-2 w-2/3 mb-12;
}
.article__time {
  @apply flex min-w-max gap-2 text-sm text-gray-400;
}
.article__content {
}
.article__title {
  @apply text-lg;
}
.article__preview {
  @apply text-base text-gray-500;
}
</style>
