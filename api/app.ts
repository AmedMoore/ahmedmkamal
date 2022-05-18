import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";

import swaggerRouter from "./routes/swagger";
import usersRouter from "./routes/users";
import postsRouter from "./routes/posts";
import tagsRouter from "./routes/tags";

const app = express();

app.set("json spaces", 2);

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", swaggerRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/tags", tagsRouter);

export default app;
