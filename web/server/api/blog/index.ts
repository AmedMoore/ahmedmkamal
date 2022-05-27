import { useRuntimeConfig } from "#imports";
import { defineHandler } from "h3";
import { Article } from "~/models/article";

export default defineHandler(async () => {
  try {
    const { beApiUrl } = useRuntimeConfig();
    const res = await fetch(`${beApiUrl}/blog`);
    const { data } = await res.json();
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(Article.from);
  } catch (e) {
    console.log("e", e);
    return [];
  }
});
