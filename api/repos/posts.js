const { nanoid } = require("nanoid");
const db = require("../db");
const { getUser } = require("./users");
const { getTag } = require("./tags");

async function validatePostRefs(post) {
  await getUser(post.author);
  await Promise.all(post.tags.map(getTag));
}

async function resolvePostRefs(post) {
  const author = await getUser(post.author);
  const tags = await Promise.all(post.tags.map(getTag));
  return { ...post, author, tags };
}

async function getPost(id) {
  const posts = await getPosts();
  const post = posts.find((x) => x.id === id);
  if (!post) {
    throw new Error("Post not found!");
  }
  return await resolvePostRefs(post);
}

async function getPosts(resolveRefs = true) {
  const posts = db.getData("/posts");
  return Array.isArray(posts)
    ? resolveRefs
      ? await Promise.all(posts.map(resolvePostRefs))
      : posts
    : [];
}

async function createPost(post) {
  await validatePostRefs(post);
  const posts = await getPosts(/* resolveRefs */ false);
  const newPost = { ...post, publishDate: new Date(), id: nanoid() };
  db.push("/posts", [...posts, newPost]);
  return await resolvePostRefs(newPost);
}

module.exports = { getPost, getPosts, createPost };
