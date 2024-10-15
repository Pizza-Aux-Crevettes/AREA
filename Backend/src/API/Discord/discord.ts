import { Express, Request, Response } from "express";
import { sendDM } from "./discord.query";

module.exports = (app: Express) => {
    app.post("/api/discord", async (req: Request, res: Response)=> {
        res.setHeader("Content-Type", "application/json");
        const { userId, message } = req.body;
            try {
              await sendDM(userId, message);
              res.status(200).json({  });
            } catch (error) {
              res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
            }
          });
}
