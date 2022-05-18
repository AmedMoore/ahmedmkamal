import { nanoid } from "nanoid";
import { Post } from "@ahmedmkamal/models";
import db from "../db";
import { getUser } from "./users";
import { getTag } from "./tags";

async function validatePostRefs(post: Post) {
  await getUser(post.author);
  await Promise.all(post.tags.map((x) => getTag(x.id)));
}

async function resolvePostRefs(post: Post) {
  const author = await getUser(post.author);
  const tags = await Promise.all(post.tags.map((x) => getTag(x.id)));
  return { ...post, author, tags };
}

export async function getPost(id: string) {
  const posts = await getPosts();
  const post = posts.find((x) => x.id === id);
  if (!post) {
    throw new Error("Post not found!");
  }
  return await resolvePostRefs(post);
}

export async function getPosts(resolveRefs = true) {
  const posts = db.getData("/posts");
  return Array.isArray(posts)
    ? resolveRefs
      ? await Promise.all(posts.map(resolvePostRefs))
      : posts
    : [];
}

export async function createPost(post: Post) {
  await validatePostRefs(post);
  const posts = await getPosts(/* resolveRefs */ false);
  const newPost = { ...post, publishDate: new Date(), id: nanoid() };
  db.push("/posts", [...posts, newPost]);
  return await resolvePostRefs(Post.from(newPost).value);
}
