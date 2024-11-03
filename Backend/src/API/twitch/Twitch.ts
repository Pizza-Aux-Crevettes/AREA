import { Express } from 'express';
import axios from 'axios';
import { updateService } from '../../routes/services/services.query';

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

    app.get('/twitch/login/:email', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        if (req.params.email) origin += `_${req.params.email}`;
        const scope = 'clips:edit user:read:email';
        const authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent('https://area.leafs-studio.com/twitch/callback')}&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}&state=random_string&code_challenge=challenge_code&code_challenge_method=plain`;
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
            redirect_uri: `${req.query.state}`.includes('@')
                ? 'https://area.leafs-studio.com/twitch/callback'
                : redirect_uri,
            code_verifier: 'challenge_code',
        });

        try {
            const response = await axios.post(tokenUrl, bodyParams);
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            let state: any = req.query.state;
            state = state.split('_');
            const origin = state[0];
            if (req.headers['user-agent']?.toLowerCase()?.includes('android')) {
                const email = state[1];
                await updateService(email, access_token, 'twitch_token');
                await updateService(email, access_token, 'twitch_refresh');
                res.send(
                    '<body><h1>You are login you can close this page</h1><script>window.close();</script ></body>'
                );
            } else {
                res.redirect(
                    `${origin}service?twitch_token=${access_token}&twitch_refresh=${refresh_token}`
                );
            }
        } catch (error) {
            console.error('Error retrieving access token :', error);
            res.send('Error during token retrieval');
        }
    });
};
