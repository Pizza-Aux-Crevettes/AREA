import { Express } from 'express';
import axios from 'axios';

const client_id = process.env.GITHUB_CLIENT_ID!;
const client_secret = process.env.GITHUB_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/github/callback';

module.exports = (app: Express) => {
    app.get("/github/login", (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        const scope = 'repo user admin:org write:issue';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}`
        res.redirect(authUrl);
    })

    app.get('/github/callback', async (req, res) => {
        const code = req.query.code || null;

        const tokenUrl = 'https://github.com/login/oauth/access_token';

        const bodyParams = new URLSearchParams({
            code: code as string,
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: redirect_uri,
        });

        const headers = {
            Accept: 'application/json',
        };

        try {
            const response = await axios.post(
                tokenUrl,
                bodyParams,
                {headers}
            );
            console.log(response.data)
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            const origin = req.query.state;
            res.redirect(
                `${origin}service?github_token=${access_token}&github_refresh=${refresh_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });

    app.get('/github/refresh_token', async (req, res) => {
        const refresh_token = req.query.refresh_token || null;
        const githubrefreshURL = 'https://github.com/login/oauth/access_token';
        const bodyParams = new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            refresh_token: refresh_token as string,
            grant_type: 'refresh_token',
        });

        try {
            const response = await axios.post(githubrefreshURL, bodyParams);
            res.json({
                access_token: response.data.access_token,
                refresh_token: response.data.refresh_token || refresh_token,
                expires_in: response.data.expires_in,
            });
        } catch (error) {
            console.error('Error refreshing Twitch token:', error);
            res.status(500).send('Error during token refresh');
        }
    });
}