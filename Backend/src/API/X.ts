import { Express } from 'express';
import axios from 'axios';

const client_id = process.env.X_CLIENT_ID!;
const client_secret = process.env.X_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/twitter/callback';

module.exports = (app: Express) => {
    app.get('/twitter/login', (req, res) => {
        const scope = 'tweet.read users.read offline.access';
        const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&state=random_string&code_challenge=challenge_code&code_challenge_method=plain`;
        res.redirect(authUrl);
    });

    app.get('/twitter/callback', async (req, res) => {
        const code = req.query.code || null;

        const tokenUrl = 'https://api.twitter.com/2/oauth2/token';
        const authOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
            },
        };

        const bodyParams = new URLSearchParams({
            code: code as string,
            grant_type: 'authorization_code',
            client_id: client_id,
            redirect_uri: redirect_uri,
            code_verifier: 'challenge_code',
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
                `http://localhost:5173/service?x_token=${access_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });
};
