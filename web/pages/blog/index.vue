<template>
  <div>
    <section>
      <h2 class="text-2xl font-semibold mb-5">Blog</h2>
      <div>
        <template v-for="article in articles" :key="article.id">
          <ArticleCard :article="article" />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "#imports";
import type { IArticle } from "~/types/article";

const { data: articles } = useFetch<IArticle[]>("/api/blog");
</script>

<style scoped lang="scss"></style>
