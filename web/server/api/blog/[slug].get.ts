import { defineEventHandler } from "h3";
import { Post } from "~/models/post";

export default defineEventHandler(({ context }) => {
  const { slug } = context.params;
  return Post.fake(slug);
});
