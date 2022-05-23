import { defineHandler } from "h3";
import http from "~/services/http";
import { Post } from "~/models/post";

export default defineHandler(async () => {
  try {
    const posts = await http.get("/blog");
    if (!Array.isArray(posts)) {
      return [];
    }
    return posts.map(Post.from);
  } catch (e) {
    console.log("e", e);
    return [];
  }
});
