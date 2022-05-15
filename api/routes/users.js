const express = require("express");
const { body } = require("express-validator");
const { getUser, getUsers, createUser } = require("../repos/users");
const { validateRequest } = require("../utils/validate-request");

/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *         required: true
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       username:
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
 * /users:
 *   get:
 *     summary: Get All Users
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/User"
 *             example:
 *               - id: 32jJJnlQtb5piErvgONYq
 *                 username: Ahmed Kamal
 *               - id: Anh8AdwnnjnqIqdySQeUU
 *                 username: Sherif Zaher
 */
router.get("/", (req, res) => {
  getUsers().then(res.send.bind(res));
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get User by ID.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns user if found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/User"
 *             example:
 *               id: c3EiM84vu0DjEivB7PteQ
 *               username: Ahmed Kamal
 *       404:
 *         description: User not found.
 *         content:
 *           plain/text:
 *             schema:
 *               type: string
 *             example: Not Found!
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.send(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: The user to create.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/NewUser"
 *     responses:
 *       200:
 *         description: Returns the newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/User"
 *             example:
 *               id: 2edjK-md1We3G_xO3WjCa
 *               username: Ahmed Kamal
 *       400:
 *         description: Request validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/ValidationError"
 *             example:
 *               value: ""
 *               msg: Invalid value
 *               param: username
 *               location: body
 */
router.post(
  "/",
  body("username").isString().isLength({ min: 3, max: 32 }),
  validateRequest,
  (req, res) => {
    createUser(req.body).then(res.send.bind(res));
  }
);

module.exports = router;
