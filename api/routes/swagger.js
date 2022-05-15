const path = require("path");
const express = require("express");
const swagger = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const router = express.Router();

router.use("/", swagger.serve);
router.get(
  "/",
  swagger.setup(
    swaggerJsdoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Blog API",
          version: "0.0.1",
        },
      },
      apis: [path.join(__dirname, "*.js")],
    })
  )
);

module.exports = router;
