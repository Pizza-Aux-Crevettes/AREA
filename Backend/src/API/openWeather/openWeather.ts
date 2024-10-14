import { Express, Request, Response } from "express";
import { getWeather, getAlerts } from "./openWeather.query";

module.exports = (app: Express) => {
    app.post("/api/Weather", async (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        const city = req.body;
        const result = await getWeather(city.forJson);
        if (result === null) {
            res.status(500).json({
                msg: "Error when fetching weather",
            });
            return;
        }
        res.status(200).json(result);
    });

    app.post("/api/alerts", async (req: Request, res: Response) =>{
        res.setHeader("Content-Type", "application/json");
        const city = req.body;
        const result = await getAlerts(city.forJson);
        if (result === null) {
            res.status(500).json({
                msg: "Error when fetching alerts",
            });
            return;
        }
        res.status(200).json(result);
    })
};
