import { Express, Request, Response, Router } from "express";
import { createService, getService, updateService } from "./services.query";

module.exports = (app: Express) => {
    app.post("/api/setNewToken", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const service_infos = req.body;
        const result = await updateService(
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

    app.post("/api/setNewUSer", async (req: Request, res: Response) => {
        console.log("JE PASSE");
        res.setHeader("Content-Type", "application/json");
        const service_infos = req.body;
        const result = await createService(service_infos.userEmail);
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
