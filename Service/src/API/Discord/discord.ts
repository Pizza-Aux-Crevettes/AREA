import { Client, GatewayIntentBits } from 'discord.js';
import {
    getRefreshDiscordToken,
    sendDM,
    updateDiscordToken,
    updateUserName,
    getUserName,
    getService
} from './discord.query';
import axios from 'axios';
import qs from 'qs';

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});

discordClient
    .login(process.env.DISCORD_TOKEN)
    .then(() => {})
    .catch((err) => {
        console.error('Error connection :', err);
    });

export async function discordSendMP(
    userId: string,
    message: string
): Promise<any> {
    try {
        const result = await sendDM(userId, message, discordClient);
        if (result === null) {
            console.error('Error when send discord mp');
            return false;
        }
        return result;
    } catch (e) {
        console.error('Error sending discord mp', e);
        await refreshTokenOfDiscord('email');
        return false;
    }
}

export async function refreshTokenOfDiscord(email: string) {
    const refresh_token: string = await getRefreshDiscordToken(email);
    const qs = require('qs');
    let data = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: `${refresh_token}`,
        client_id: `${CLIENT_ID}`,
        client_secret: `${CLIENT_SECRET}`,
    });
    const authOptions = {
        url: 'https://discord.com/api/v10/oauth2/token',
        headers: {
            Authorization:
                'Bearer ' +
                Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        data: data,
    };

    try {
        const response = await axios.request(authOptions);

        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        if (response.data) {
            const result = await updateDiscordToken(
                email,
                access_token,
                refresh_token
            );
            if (result) {
                console.log('Update discord token OK');
            }
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
}

export async function updateUsername(
    email: string,
    newUsername: string
): Promise<any> {
    try {
        const result = await updateUserName(newUsername, email);
        if (!result) {
            console.error('Error when send discord mp');
            return;
        }
        return result;
    } catch (e) {
        console.error('Error sending discord mp', e);
        await refreshTokenOfDiscord('email');
        return false;
    }
}

export async function getUsername(email: string): Promise<any> {
    try {
        const result = await getUserName(email);
        if (result === null) {
            console.error('Error when send discord mp');
            return;
        }
        return result;
    } catch (e) {
        console.error('Error sending discord mp', e);
        await refreshTokenOfDiscord('email');
        return false;
    }
}

export async function ifChangeUsername(
    email: string
): Promise<boolean> {
    const result = await discordUserMe(email);
    const newUsername = result.global_name;
    const username = await getUsername(email);
    if (username[0].username !== newUsername) {
        console.log("username = ",username[0].username);
        console.log("newUsername = ",newUsername);
        const result = await updateUsername(email, newUsername);
        return true;
    } else {
        return false;
    }
}

export async function discordUserMe (email:string) {
    const result = await getTokensServices(email);
    if (result !== null) {
        try {
            const response = await axios.get(
                'https://discord.com/api/users/@me',
                {
                    headers: {
                        Authorization: `Bearer ${result[0].discord_token}`,
                    },
                }
            );

            return response.data;

        } catch (error) {
            console.error(
                "Erreur lors de la récupération des infos de l'utilisateur:",
                error
            );
        }
    }
}

export async function getTokensServices (email:string) {
    const result = await getService(email);
    return result;
}