import { Express, Request, Response } from "express";
import { Client, GatewayIntentBits } from 'discord.js';
import { sendDM } from "./discord.query";

const discordClient = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
  ]
});

discordClient.login(process.env.DISCORD_TOKEN).then(() => {})
.catch(err => {
  console.error('Error connection :', err);
});

module.exports = (app: Express) => {
    app.post("/api/discord", async (req: Request, res: Response)=> {
        res.setHeader("Content-Type", "application/json");
        const { userId, message } = req.body;
            try {
              await sendDM(userId, message, discordClient);
              res.status(200).json({  });
            } catch (error) {
              res.status(500).json({ msg: 'cannot send the message' });
            }
          });
}
