import { useRuntimeConfig } from "#imports";
import { defineHandler } from "h3";
import { Article } from "~/models/article";

export default defineHandler(async ({ context: { params } }) => {
  try {
    const { beApiUrl } = useRuntimeConfig();
    const res = await fetch(`${beApiUrl}/blog/${params.slug}`);
    const { data } = await res.json();
    return Article.from(data);
  } catch (e) {
    console.log("e", e);
    return null;
  }
});
