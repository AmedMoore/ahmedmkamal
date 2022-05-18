<template>
  <div class="flex flex-col">
    <section id="blog" class="my-12">
      <h1 class="text-2xl text-center mb-8">Latest from my blog</h1>
      <div class="flex flex-col items-center">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "#app";
import { computed } from "#imports";
import PostCard from "~/components/post-card.vue";
import type { Post } from "@ahmedmkamal/models";

const { data } = await useFetch<Post[]>("/api/blog/posts");

const posts = computed<Post[]>(() => data.value);
</script>
