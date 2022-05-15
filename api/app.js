const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

app.set("json spaces", 2);

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/swagger"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/tags", require("./routes/tags"));

module.exports = app;
