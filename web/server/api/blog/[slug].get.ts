import { defineEventHandler } from "h3";
import { Post } from "@ahmedmkamal/models";

export default defineEventHandler(({ context }) => {
  const { slug } = context.params;
  return Post.fake(slug);
});
