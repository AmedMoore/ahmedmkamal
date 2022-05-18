import { Tag } from "@ahmedmkamal/models";
import { nanoid } from "nanoid";
import db from "../db";

export async function getTag(id: string): Promise<Tag> {
  const tags = await getTags();
  const tag = tags.find((x) => x.id === id);
  if (!tag) {
    throw new Error("Tag not found!");
  }
  return tag;
}

export async function getTags() {
  const tags = db.getData("/tags");
  return Array.isArray(tags) ? tags : [];
}

export async function createTag(tag: Record<string, unknown>) {
  const tags = await getTags();
  const newTag = { ...tag, id: nanoid() };
  db.push("/tags", [...tags, newTag]);
  return newTag;
}

export async function deleteTags(id: string) {
  const tag = await getTag(id);
  const tags = await getTags();
  tags.splice(tags.indexOf(tag), 1);
  db.push("/tags", tags);
  return tag;
}
