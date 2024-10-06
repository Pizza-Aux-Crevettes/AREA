import { Express, Request, Response, Router } from "express";
import {
    loginUsers,
    verifyPwd,
    lowercaseFirstLetter,
} from "./login.query";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

function generateToken(email: string): string {
    return jwt.sign({ email: email }, process.env.SECRET);
}
    
module.exports = (app: Express) => {
    /**
     * @swagger
     * /api/login:
     *   post:
     *     summary: Login route
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email of the user
     *               password:
     *                 type: string
     *                 description: User password
     *     responses:
     *       200:
     *         description: Returns a JWT token
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 own_token:
     *                   type: string
     *                   description: The JWT token for authentication
     *       400:
     *         description: Bad Request - Missing or invalid email/password
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Missing email or password"
     *       401:
     *         description: Unauthorized - Incorrect email or password
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Incorrect email or password"
     */

    app.post("/api/login", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const user_infos = req.body;
        const result = await loginUsers(lowercaseFirstLetter(user_infos.email));
        if (result === null) {
            console.log("test");
            res.status(400).json({
                msg: "Missing email or password",
            });
            return;
        }
        const samePwd = await verifyPwd(
            user_infos.password,
            result[0].password
        );
        if (!samePwd) {
            res.status(401).json({
                msg: "Incorrect email or password",
            });
            return;
        }
        res.status(200).json({
            own_token: generateToken(user_infos.email),
        });
    });
}