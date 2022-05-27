import { defineHandler } from "h3";

export default defineHandler(async () => {
  try {
    return { status: "healthy" };
  } catch (e) {
    console.log("e", e);
    return [];
  }
});
