import { Express, Request, Response, Router } from "express";
import { createUsers, loginUsers, verifyPwd } from "./users.query";
import bcrypt from "bcryptjs";

module.exports = (app: Express) => {
    app.post("/api/setUsers", async (req: Request, res: Response) => {
        console.log(req.body);

        res.setHeader("Content-Type", "application/json");
        const user_infos = req.body;
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
        console.log(req.body);

        res.setHeader("Content-Type", "application/json");
        const user_infos = req.body;
        const result = await loginUsers(user_infos.email);
        if (result === null) {
            res.status(500).json({
                msg: "Error when getting user",
            });
            return;
        }
        const samePwd = verifyPwd(user_infos.password, result.password);
        if (!samePwd) {
            res.status(500).json({
                msg: "Error when getting user",
            });
            return;
        }
        res.status(200).json(result);
    });
};
