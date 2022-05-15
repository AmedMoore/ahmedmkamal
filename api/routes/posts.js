const express = require("express");
const { body } = require("express-validator");
const { getPost, getPosts, createPost } = require("../repos/posts");
const { validateRequest } = require("../utils/validate-request");

/**
 * @swagger
 * definitions:
 *   NewPost:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         required: true
 *       content:
 *         type: string
 *         required: true
 *       coverUrl:
 *         type: string
 *         required: true
 *       author:
 *         type: string
 *         required: true
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *   Post:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       content:
 *         type: string
 *       coverUrl:
 *         type: string
 *       publishDate:
 *         type: string
 *       author:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           username:
 *             type: string
 *       tags:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             username:
 *               type: string
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
 * /posts:
 *   get:
 *     summary: Get All Posts
 *     tags:
 *       - Posts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/Post"
 *             example:
 *               - id: D8F2WSzMZBGHWOTxZ9SQc
 *                 title: Ut vel sodales eros, non commodo ligula.
 *                 content: Ut vel sodales eros, non commodo ligula...
 *                 coverUrl: https://picsum.photos/1200/700
 *                 publishDate: 2022-05-09T19:35:14.461Z
 *                 author:
 *                   id: zWUpsSZ4iLHB0PmyI81Zg
 *                   username: Ahmed Kamal
 *                 tags:
 *                   - id: YRwAMHfqRipenXKEB68Xe
 *                     name: Travel
 *                   - id: dpWGMHmrRsrQaipk58-7H
 *                     name: Blogger Template
 *                   - id: 45f74ENPyMk81NRVg_m1t
 *                     name: Elegant
 *               - id: vlfNIIVtv-C1cYHhU0R4F
 *                 title: Maecenas tempus suscipit risus, nec laoreet ante malesuada vitae.
 *                 content: Maecenas tempus suscipit risus, nec laoreet ante malesuada vitae...
 *                 coverUrl: https://picsum.photos/1200/700
 *                 publishDate: 2022-05-09T19:35:14.461Z
 *                 author:
 *                   id: 9zvfmaNLDdMiXgh76xsUx
 *                   username: Sherif Zaher
 *                 tags:
 *                   - id: 1WoDPwRLOXa3QsfBjASKP
 *                     name: Magazine
 */
router.get("/", (req, res) => {
  getPosts().then(res.send.bind(res));
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get Post by ID.
 *     tags:
 *       - Posts
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns post if found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Post"
 *             example:
 *               id: k3fVS8DfgiDaUrEfoxoPb
 *               title: Ut vel sodales eros, non commodo ligula.
 *               content: Ut vel sodales eros, non commodo ligula...
 *               coverUrl: https://picsum.photos/1200/700
 *               publishDate: 2022-05-09T19:35:14.461Z
 *               author:
 *                 id: Xq43ZTrk7yW-4x4Dy4oHX
 *                 username: Ahmed Kamal
 *       404:
 *         description: Post not found.
 *         content:
 *           plain/text:
 *             schema:
 *               type: string
 *             example: Not Found!
 */
router.get("/:id", async (req, res) => {
  try {
    const post = await getPost(req.params.id);
    res.send(post);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create Post
 *     tags:
 *       - Posts
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: The post to create.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/NewPost"
 *     responses:
 *       200:
 *         description: Returns the newly created post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Post"
 *             example:
 *               id: 3TGVLe3GMgx8PnrGt4ocs
 *               title: Ut vel sodales eros, non commodo ligula.
 *               content: Ut vel sodales eros, non commodo ligula...
 *               coverUrl: https://picsum.photos/1200/700
 *               publishDate: 2022-05-09T19:35:14.461Z
 *               author:
 *                 id: BAhMN7x8po05FfQevHoh5
 *                 username: Ahmed Kamal
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
 *       404:
 *         description: Error when author or one (or more) of the tag are not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *             example: User not found!
 */
router.post(
  "/",
  body("title").isString().isLength({ min: 16, max: 120 }),
  body("content").isString().isLength({ min: 16, max: 10240 }),
  body("coverUrl").isURL(),
  body("author").isString().isLength({ min: 21, max: 21 }),
  body("tags.*").isString().isLength({ min: 21, max: 21 }),
  validateRequest,
  async (req, res) => {
    try {
      const post = await createPost(req.body);
      res.send(post);
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
);

module.exports = router;
