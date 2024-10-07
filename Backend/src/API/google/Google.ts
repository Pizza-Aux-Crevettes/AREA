import { Express } from 'express';
import axios from 'axios';

const client_id = process.env.GOOGLE_CLIENT_ID!;
const client_secret = process.env.GOOGLE_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/google/callback';

module.exports = (app: Express) => {
    app.get('/google/login', (req, res) => {
        const scope =
            'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&access_type=offline&prompt=consent`;
        res.redirect(authUrl);
    });

    app.get('/google/callback', async (req, res) => {
        const code = req.query.code || null;

        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const authOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };

        const bodyParams = new URLSearchParams({
            code: code as string,
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
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
                `http://localhost:5173/service?google_token=${access_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });
};
