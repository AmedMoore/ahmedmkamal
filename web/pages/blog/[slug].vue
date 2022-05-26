<template>
  <div>
    <template v-if="error || !article">
      <p>{{ errorMessage }}</p>
    </template>
    <template v-else>
      <article class="article" :id="article.id">
        <img
          v-if="!!article.coverUrl"
          :src="article.coverUrl"
          :alt="article.title"
          class="cover"
        />
        <h1 class="title">{{ article.title }}</h1>
        <div class="info-container">
          <address class="publisher">
            <span>By </span>
            <NuxtLink href="/">{{ article.publisher.displayName }}</NuxtLink>
          </address>
          <span> &mdash; </span>
          <time>{{ article.publishDate }}</time>
        </div>
        <MdViewer :content="article.content" />
      </article>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useFetch, computed, useHead } from "#imports";
import type { IArticle } from "~/types/article";

const { params } = useRoute();

const { data: article, error } = useFetch<IArticle>(`/api/blog/${params.slug}`);

const errorMessage = computed(() =>
  error.value instanceof Error ? error.value.message : "Article not found!",
);

useHead({
  titleTemplate: article.value?.title ?? "Article not found!",
});
</script>

<style scoped lang="scss">
.article {
  @apply flex flex-col gap-2 mb-12;
}

.cover {
  @apply block w-full h-80 mb-8 object-cover border border-zinc-500;
}

.title {
  @apply text-2xl font-semibold;
}

.info-container {
  @apply text-sm text-zinc-400 dark:text-zinc-500 my-2;
}

.publisher {
  @apply inline;
}

.content {
  @apply text-base font-medium text-zinc-600 dark:text-zinc-400;
}
</style>
