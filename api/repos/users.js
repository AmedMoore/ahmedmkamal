const { nanoid } = require("nanoid");
const db = require("../db");

async function getUser(id) {
  const users = await getUsers();
  const user = users.find((x) => x.id === id);
  if (!user) {
    throw new Error("User not found!");
  }
  return user;
}

async function getUsers() {
  const users = db.getData("/users");
  return Array.isArray(users) ? users : [];
}

async function createUser(user) {
  const users = await getUsers();
  const newUser = { ...user, id: nanoid() };
  db.push("/users", [...users, newUser]);
  return newUser;
}

module.exports = { getUser, getUsers, createUser };
