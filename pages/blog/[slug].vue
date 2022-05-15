<template>
  <div class="article__page">
    <article class="article">
      <div class="article__time">
        <time>{{ post.publishDate }}</time>
        <VueFeather type="minus" size="20" />
      </div>
      <div>
        <h1 class="article__title">{{ post.title }}</h1>
        <p class="article__content">{{ post.content }}</p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "#app";
import { computed } from "#imports";
import { useRoute } from "vue-router";
import VueFeather from "vue-feather";
import type { Post } from "~/models/post";

const route = useRoute();

const { data } = await useFetch<Post>(`/api/blog/${route.params.slug}`);

const post = computed<Post>(() => data.value);
</script>

<style scoped>
.article__page {
  @apply flex justify-center;
}
.article {
  @apply flex gap-2 w-2/3 mb-12;
}
.article__time {
  @apply flex min-w-max gap-2 text-sm text-gray-400;
}
.article__title {
  @apply text-lg;
}
.article__content {
  @apply text-base text-gray-500;
}
</style>
