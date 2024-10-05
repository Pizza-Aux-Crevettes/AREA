import { Express, Request, Response, Router } from "express";
import { createService, getService } from "./services.query";

module.exports = (app: Express) => {
    app.post("/api/setNewToken", async (req: Request, res: Response) => {
        console.log("CA PASSE");
        res.setHeader("Content-Type", "application/json");
        const service_infos = req.body;
        console.log(service_infos);
        const result = await createService(
            service_infos.userEmail,
            service_infos.token_spotify
        );
        if (result === null) {
            res.status(500).json({
                msg: "Error when setting new token",
            });
            return;
        }
        res.status(200).json(result);
    });

    app.post("/api/getToken", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const service_infos = req.body;
        const result = await getService(service_infos.user_email);
        if (result === null) {
            res.status(500).json({
                msg: "Error when get token service",
            });
            return;
        }
        res.status(200).json(result);
    });
};
