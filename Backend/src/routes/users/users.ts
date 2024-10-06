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
            res.status(500).json({
                msg: "Error when setting new user",
            });
            return;
        }
        res.status(200).json(result);
    });

    app.post("/api/getUsers", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const user_infos = req.body;
        const result = await loginUsers(lowercaseFirstLetter(user_infos.email));
        if (result === null) {
            console.log("test");
            res.status(500).json({
                msg: "Error when getting user",
            });
            return;
        }
        const samePwd = await verifyPwd(
            user_infos.password,
            result[0].password
        );
        if (!samePwd) {
            res.status(500).json({
                msg: "Error when getting user",
            });
            return;
        }
        res.status(200).json({
            own_token: generateToken(user_infos.email),
        });
    });

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
