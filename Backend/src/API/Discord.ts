import { Express } from 'express';
import axios from 'axios';

const client_id = process.env.DISCORD_CLIENT_ID!;
const client_secret = process.env.DISCORD_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/discord/callback';

module.exports = (app: Express) => {
    app.get('/discord/login', (req, res) => {
        const scope = 'identify email';
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
        res.redirect(authUrl);
    });

    app.get('/discord/callback', async (req, res) => {
        const code = req.query.code || null;

        const tokenUrl = 'https://discord.com/api/oauth2/token';
        const authOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const bodyParams = new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'authorization_code',
            code: code as string,
            redirect_uri: redirect_uri,
        });

        try {
            const response = await axios.post(
                tokenUrl,
                bodyParams,
                authOptions
            );
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            res.redirect(
                `http://localhost:5173/service?discord_token=${access_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });
};
