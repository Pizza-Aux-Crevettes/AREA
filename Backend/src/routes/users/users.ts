import { Express, Request, Response, Router } from "express";
import {
    createUsers,
    loginUsers,
    verifyPwd,
    lowercaseFirstLetter,
} from "./users.query";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

function generateToken(email: string): string {
    return jwt.sign({ email: email }, process.env.SECRET);
}

module.exports = (app: Express) => {
    /**
     * @swagger
     * /api/setUsers:
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
    app.post("/api/setUsers", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const user_infos = req.body;
        console.log(user_infos);
        const result = await createUsers(
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

    /**
     * @swagger
     * /api/getUsers:
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

    app.post("/api/getUsers", async (req: Request, res: Response) => {
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

    /**
     * @swagger
     * /api/user/me:
     *   get:
     *     summary: Get user data
     *     responses:
     *       200:
     *         description: Get the email of user who is actually connected
     *         content:
     *           application/json:
     *             schema:
     *               items:
     *                 type: string
     */

    app.get("/api/user/me", async (req: Request, res: Response) => {
        const token = req.header("Authorization");
        res.header("Response-Type", "application/json");
        if (!token) {
            res.status(401).json();
            return;
        } else {
            let webToken = token.toString().split(" ")[1];
            try {
                const decoded: any = jwt.verify(webToken, process.env.SECRET);
                res.status(200).json({ email: decoded.email });
            } catch (error) {
                console.error("JWT verification failed:", error);
                res.status(401).json({ msg: "Invalid or expired token" });
            }
        }
    });
};
