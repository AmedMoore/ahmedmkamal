const { nanoid } = require("nanoid");
const db = require("../db");

async function getTag(id) {
  const tags = await getTags();
  const tag = tags.find((x) => x.id === id);
  if (!tag) {
    throw new Error("Tag not found!");
  }
  return tag;
}

async function getTags() {
  const tags = db.getData("/tags");
  return Array.isArray(tags) ? tags : [];
}

async function createTag(tag) {
  const tags = await getTags();
  const newTag = { ...tag, id: nanoid() };
  db.push("/tags", [...tags, newTag]);
  return newTag;
}

async function deleteTags(id) {
  const tag = await getTag(id);
  const tags = await getTags();
  tags.splice(tags.indexOf(tag), 1);
  db.push("/tags", tags);
  return tag;
}

module.exports = { getTag, getTags, createTag, deleteTags };
