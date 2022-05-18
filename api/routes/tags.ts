import express from "express";
import { body } from "express-validator";
import { getTag, getTags, createTag, deleteTags } from "../repos/tags";
import { validateRequest } from "../utils/validate-request";

/**
 * @swagger
 * definitions:
 *   NewTag:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         required: true
 *   Tag:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *   ValidationError:
 *     type: object
 *     properties:
 *       value:
 *         type: string
 *       msg:
 *         type: string
 *       param:
 *         type: string
 *       location:
 *         type: string
 */
const router = express.Router();

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get All Tags
 *     tags:
 *       - Tags
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns list of tags.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/Tag"
 *             example:
 *               - id: MB8FoPnAxatlN_e5YUpYB
 *                 name: Travel
 *               - id: 4_dKnMMELfszCN_ezlros
 *                 name: Entertainment
 */
router.get("/", (_req, res) => {
  getTags().then(res.send.bind(res));
});

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Get Tag by ID.
 *     tags:
 *       - Tags
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tag ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns tag if found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Tag"
 *             example:
 *               id: FbJilAwUTE3vW-Gb8DfkN
 *               name: Travel
 *       404:
 *         description: Tag not found.
 *         content:
 *           plain/text:
 *             schema:
 *               type: string
 *             example: Not Found!
 */
router.get("/:id", async (req, res) => {
  try {
    const tag = await getTag(req.params.id);
    res.send(tag);
  } catch (e) {
    res.status(404).send(e instanceof Error ? e.message : "Not Found!");
  }
});

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create Tag
 *     tags:
 *       - Tags
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: The tag to create.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/NewTag"
 *     responses:
 *       200:
 *         description: Returns the newly created tag.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Tag"
 *             example:
 *               id: in1GmhUX_sVTGH7H5NtRO
 *               name: Travel
 *       400:
 *         description: Request validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/ValidationError"
 *             example:
 *               value: ""
 *               msg: Invalid value
 *               param: name
 *               location: body
 */
router.post(
  "/",
  body("name").isString().isLength({ min: 3, max: 32 }),
  validateRequest,
  (req, res) => {
    createTag(req.body).then(res.send.bind(res));
  }
);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Delete Tag
 *     tags:
 *       - Tags
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Tag ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the deleted Tag.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Tag"
 *             example:
 *               id: MB8FoPnAxatlN_e5YUpYB
 *               name: Travel
 *       404:
 *         description: Tag not found.
 *         content:
 *           plain/text:
 *             schema:
 *               type: string
 *             example: Not Found!
 */
router.delete("/:id", async (req, res) => {
  try {
    const tag = await deleteTags(req.params.id);
    res.send(tag);
  } catch (e) {
    res.status(404).send(e instanceof Error ? e.message : "Not Found!");
  }
});

export default router;
