import { nanoid } from "nanoid";
import db from "../db";

export async function getUser(id: string) {
  const users = await getUsers();
  const user = users.find((x) => x.id === id);
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
}

export async function getUsers() {
  const users = db.getData("/users");
  return Array.isArray(users) ? users : [];
}

export async function createUser(user: Record<string, unknown>) {
  const users = await getUsers();
  const newUser = { ...user, id: nanoid() };
  db.push("/users", [...users, newUser]);
  return newUser;
}
