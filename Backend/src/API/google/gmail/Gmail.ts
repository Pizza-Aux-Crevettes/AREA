import { Express, Request, Response } from "express";
import { getGmailMe } from "./Gmail.query";

module.exports = (app: Express) => {
    app.post("/api/Gmail/me", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const info = req.body;
        console.log(info)
        const result = await getGmailMe(info.token);
        if (result === null) {
            res.status(500).json({
                msg: "Error when fetching user mail",
            });
            return;
        }
        res.status(200).json(result);
    });
}
