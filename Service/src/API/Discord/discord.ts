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

discordClient.login(process.env.DISCORD_TOKEN).then(() => { })
  .catch(err => {
    console.error('Error connection :', err);
  });

export async function discordSendMP (userId: string, message: string): Promise<any> {
    const result = await sendDM(userId, message, discordClient);
    if (result === null) {
      console.error('Error when send discord mp');
      return;
  }
  return result;
}
