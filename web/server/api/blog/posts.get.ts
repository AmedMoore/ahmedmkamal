import { defineEventHandler } from "h3";
import { Post } from "@ahmedmkamal/models";

export default defineEventHandler(() => {
  return [Post.fake(), Post.fake(), Post.fake(), Post.fake()];
});
