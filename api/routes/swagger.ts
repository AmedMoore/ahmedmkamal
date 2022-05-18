import path from "path";
import express from "express";
import swagger from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

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

export default router;
