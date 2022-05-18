<template>
  <a v-if="external" :href="href" :target="target" class="link">
    <slot />
  </a>
  <NuxtLink v-else :to="href" class="link">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";

const props = defineProps<{ href: string; external?: true }>();

const target = computed(() => (props.external ? "_blank" : "_self"));
</script>

<style scoped lang="scss">
.link {
  @apply text-blue-500;
}
</style>
