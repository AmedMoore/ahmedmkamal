<template>
  <div class="flex flex-col">
    <section id="intro" class="text-center my-12">
      <h1 class="text-3xl">Hey! I'm Ahmed Kamal,</h1>
      <h2 class="text-xl">
        Egypt based Software Developer building cool stuff for Mobile and Web.
      </h2>
      <p>
        <span>Find me on </span>
        <Link external :href="socialLinks.github">Github</Link>
        <span>, </span>
        <Link external :href="socialLinks.twitter">Twitter</Link>
        <span>, and </span>
        <Link external :href="socialLinks.upwork">Upwork</Link>
        <span>.</span>
      </p>
    </section>
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
import type { Post } from "~/models/post";

const socialLinks = {
  github: "https://github.com/ahmedmkamal",
  twitter: "https://twitter.com/akaahmedkamal",
  upwork: "https://www.upwork.com/freelancers/~01f21e9baaabb64d1d",
};

const { data } = await useFetch<Post[]>("/api/blog/posts");

const posts = computed<Post[]>(() => data.value);
</script>
