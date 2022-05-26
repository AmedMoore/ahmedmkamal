<template>
  <div class="flex gap-6 h-full w-full">
    <div class="flex w-1/2 h-full">
      <textarea
        v-model="md"
        class="w-full h-full p-2 outline-none resize-none dark:bg-zinc-800"
      ></textarea>
    </div>
    <div class="w-1/2">
      <MdViewer :content="md" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, onMounted, ref, watch } from "#imports";

const md = ref("");

onMounted(() => (md.value = localStorage.getItem("md") || ""));

watch(md, (value) => localStorage.setItem("md", value));

definePageMeta({ layout: "admin" });
</script>
