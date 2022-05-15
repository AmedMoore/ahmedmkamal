import { defineEventHandler } from "h3";
import { Post } from "~/models/post";

export default defineEventHandler(() => {
  return [Post.fake(), Post.fake(), Post.fake(), Post.fake()];
});
