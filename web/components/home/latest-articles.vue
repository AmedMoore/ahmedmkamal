<template>
  <section id="latest-articles">
    <h2 class="title">Latest articles</h2>
    <template v-for="article in articles" :key="article.id">
      <ArticleCard :article="article" />
    </template>
  </section>
</template>

<script setup lang="ts">
import { useFetch } from "#imports";
import type { IArticle } from "~/types/article";

const { data: articles } = useFetch<IArticle[]>("/api/blog");
</script>

<style scoped lang="scss">
.title {
  @apply text-2xl font-semibold mb-5;
}
</style>
