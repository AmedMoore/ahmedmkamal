import { defineHandler } from "h3";
import http from "~/services/http";
import { Article } from "~/models/article";

export default defineHandler(async ({ context: { params } }) => {
  try {
    const { data } = await http.get(`/blog/${params.slug}`);
    return Article.from(data);
  } catch (e) {
    console.log("e", e);
    return null;
  }
});
