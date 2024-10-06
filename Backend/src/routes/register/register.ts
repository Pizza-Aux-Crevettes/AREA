import { Express, Request, Response, Router } from "express";
import {
    register,
} from "./register.query";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
 
module.exports = (app: Express) => {
   
   /**
     * @swagger
     * /api/register:
     *   post:
     *     summary: Creation of a new user in data base
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               surname:
     *                 type: string
     *               username:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: The user has been created
     *       409:
     *         description: Conflict - Email or username already exists
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Email or username already exists"
     */
    app.post("/api/register", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const user_infos = req.body;
        console.log(user_infos);
        const result = await register(
            user_infos.name,
            user_infos.surname,
            user_infos.username,
            bcrypt.hashSync(user_infos.password, 10),
            user_infos.email
        );
        if (result === null) {
            res.status(409).json({
                msg: "Email or username already exists",
            });
            return;
        }
        res.status(201).json(result);
    });
}
