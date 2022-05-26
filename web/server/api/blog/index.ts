import { defineHandler } from "h3";
import http from "~/services/http";
import { Article } from "~/models/article";

export default defineHandler(async () => {
  try {
    const { data } = await http.get("/blog");
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map(Article.from);
  } catch (e) {
    console.log("e", e);
    return [];
  }
});
