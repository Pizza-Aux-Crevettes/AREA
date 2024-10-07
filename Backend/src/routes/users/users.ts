import { Express, Request, Response } from "express";
const jwt = require("jsonwebtoken");

module.exports = (app: Express) => {

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
        // console.log(token);
        res.header("Response-Type", "application/json");
        if (!token) {
            res.status(401).json();
            return;
        } else {
            let webToken = token.toString().split(" ")[1];
            try {
                const decoded: any = jwt.verify(webToken, process.env.SECRET);
                console.log(decoded.email);
                res.status(200).json({ email: decoded.email });
            } catch (error) {
                console.error("JWT verification failed:", error);
                res.status(401).json({ msg: "Invalid or expired token" });
            }
        }
    });
};
