import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv";

dotenv.config();

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

discordClient.login(process.env.DISCORD_TOKEN).then(() => {
    console.log('Bot connecté avec succès !');
}).catch(err => {
    console.error('Erreur de connexion au bot :', err);
});

export async function sendDM(userId: string, message: string): Promise<void> {
    try {
        const user = await discordClient.users.fetch(userId);
        await user.send(message);
        console.log(`Message envoyé à ${user.tag}`);
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message privé :', error);
        throw new Error('Impossible d\'envoyer le message');
    }
}
