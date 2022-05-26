<template>
  <section id="hero">
    <h1 class="title">
      <span class="prefix">Hey! </span>
      <span>I'm Ahmed Kamal</span>
      <small>
        (<a class="link" :href="gSearchUrl" target="_blank">@ahmedmkamal</a>).
      </small>
    </h1>
    <p class="paragraph">I'm a Full-Stack developer from Cairo, Egypt 🇪🇬.</p>
    <p class="paragraph">
      <span>I'm TOP-RATED (top 3%) web and mobile developer on </span>
      <a class="link" :href="socialLinks.upwork" target="_blank">Upwork</a>
      <span>.</span>
    </p>
    <p class="paragraph">
      I write about Software Development, Freelancing, and Personal Projects in
      <NuxtLink class="link" to="/blog">my blog</NuxtLink>, stay tuned if you're
      interested in these topics.
    </p>
    <p class="paragraph">
      <span>Find me on </span>
      <a class="link" :href="socialLinks.github" target="_blank">Github</a>
      <span>, </span>
      <a class="link" :href="socialLinks.twitter" target="_blank">Twitter</a>
      <span>, or </span>
      <a class="link" :href="socialLinks.upwork" target="_blank">Upwork</a>
      <span>.</span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { useGSearch } from "#imports";

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
  upwork: "https://upwork.com/freelancers/~01f21e9baaabb64d1d",
  github: "https://github.com/ahmedmkamal",
  twitter: "https://twitter.com/akaahmedkamal",
};
</script>

<style scoped lang="scss">
section {
  @apply mb-12;
}

.title {
  @apply text-3xl font-medium;
  .prefix {
    @apply text-zinc-400 dark:text-zinc-500;
  }
}

.paragraph {
  @apply text-zinc-600 dark:text-zinc-300 text-base font-medium my-4;
}
</style>
