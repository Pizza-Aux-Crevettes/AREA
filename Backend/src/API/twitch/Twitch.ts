import { Express } from 'express';
import axios from 'axios';

const client_id = process.env.TWITCH_CLIENT_ID!;
const client_secret = process.env.TWITCH_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/twitch/callback';

module.exports = (app: Express) => {
    app.get('/twitch/login', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        const scope = 'clips:edit user:read:email';
        const authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}&state=random_string&code_challenge=challenge_code&code_challenge_method=plain`;
        res.redirect(authUrl);
    });

    app.get('/twitch/callback', async (req, res) => {
        const code = req.query.code || null;

        const tokenUrl = 'https://id.twitch.tv/oauth2/token';

        const bodyParams = new URLSearchParams({
            code: code as string,
            grant_type: 'authorization_code',
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            code_verifier: 'challenge_code',
        });

        try {
            const response = await axios.post(tokenUrl, bodyParams);
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            const origin = req.query.state;
            res.redirect(
                `${origin}service?twitch_token=${access_token}&twitch_refresh=${refresh_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });

    app.get('/twitch/refresh_token', async (req, res) => {
        const refresh_token = req.query.refresh_token || null;
        const twitchrefreshURL = 'https://id.twitch.tv/oauth2/token';
        const bodyParams = new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            refresh_token: refresh_token as string,
            grant_type: 'refresh_token',
        });

        try {
            const response = await axios.post(twitchrefreshURL, bodyParams);
            res.json({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token || refresh_token,
                expires_in: response.data.expires_in,
            });
        } catch (error) {
            console.error('Error refreshing twitch token:', error);
            res.status(500).send('Error during token refresh');
        }
    });
};
