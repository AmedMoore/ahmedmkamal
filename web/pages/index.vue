<template>
  <div>
    <section class="mb-12">
      <h1 class="text-3xl font-medium">
        <span class="text-zinc-400 dark:text-zinc-500">Hey! </span>
        I'm Ahmed Kamal
        <small>
          (<a class="link" :href="gSearchUrl" target="_blank">@ahmedmkamal</a>).
        </small>
      </h1>
      <p class="text-zinc-600 dark:text-zinc-300 text-base font-medium my-4">
        I'm a Full-Stack developer from Cairo, Egypt 🇪🇬.
      </p>
      <p class="text-zinc-600 dark:text-zinc-300 text-base font-medium my-4">
        <span>I'm TOP-RATED (top 3%) web and mobile developer on </span>
        <a class="link" :href="socialLinks.upwork" target="_blank">Upwork</a>
        <span>.</span>
      </p>
      <p class="text-zinc-600 dark:text-zinc-300 text-base font-medium my-4">
        I write about Software Development, Freelancing, and Personal Projects
        in <NuxtLink class="link" to="/blog">my blog</NuxtLink>, stay tuned if
        you're interested in these topics.
      </p>
      <p class="text-zinc-600 dark:text-zinc-300 text-base font-medium my-4">
        <span>Find me on </span>
        <a class="link" :href="socialLinks.github" target="_blank">Github</a>
        <span>, </span>
        <a class="link" :href="socialLinks.twitter" target="_blank">Twitter</a>
        <span>, or </span>
        <a class="link" :href="socialLinks.upwork" target="_blank">Upwork</a>
        <span>.</span>
      </p>
    </section>
    <section>
      <h2 class="text-2xl font-semibold mb-5">Latest articles</h2>
      <div>
        <template v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useGSearch } from "#imports";
import { useFetch } from "#app";
import type { Post } from "~/models/post";
import PostCard from "~/components/post-card.vue";

const gSearchUrl = useGSearch({
  terms: ["@ahmedmkamal", "@akaahmedkamal"],
  sites: [
    "ahmedmkamal.com",
    "github.com",
    "linkedin.com",
    "medium.com",
    "stackoverflow.com",
    "twitter.com",
    "dev.to",
    "instagram.com",
  ],
});

const socialLinks = {
  upwork: "//upwork.com/freelancers/~01f21e9baaabb64d1d",
  github: "//github.com/ahmedmkamal",
  twitter: "//twitter.com/akaahmedkamal",
};

const { data: posts } = useFetch<Post[]>("/api/blog");
</script>

<style scoped lang="scss"></style>
