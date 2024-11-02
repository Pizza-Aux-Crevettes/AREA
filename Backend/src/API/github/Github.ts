import { Express } from 'express';
import axios from 'axios';
import { updateService } from '../../routes/services/services.query';

const client_id = process.env.GITHUB_CLIENT_ID!;
const client_secret = process.env.GITHUB_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/github/callback';

module.exports = (app: Express) => {
    app.get('/github/login', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        const scope = 'repo user admin:org write:issue';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}`;
        res.redirect(authUrl);
    });

    app.get('/github/login/:email', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        if (req.params.email) origin += `_${req.params.email}`;
        const scope = 'repo user write:issue';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent('https://area.leafs-studio.com/github/callback')}&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}`;
        res.redirect(authUrl);
    });

    app.get('/github/callback', async (req, res) => {
        const code = req.query.code || null;

        const tokenUrl = 'https://github.com/login/oauth/access_token';

        const bodyParams = new URLSearchParams({
            code: code as string,
            client_id: client_id,
            client_secret: client_secret,
            redirect_uri: `${req.query.state}`.includes('@')
                ? 'https://area.leafs-studio.com/github/callback'
                : redirect_uri,
        });

        const headers = {
            Accept: 'application/json',
        };

        try {
            const response = await axios.post(tokenUrl, bodyParams, {
                headers,
            });
            const access_token = response.data.access_token;
            let state: any = req.query.state;
            state = state.split('_');
            const origin = state[0];
            if (req.headers['user-agent']?.toLowerCase()?.includes('android')) {
                const email = state[1];
                await updateService(email, access_token, 'github_token');
                res.send(
                    '<body><h1>You are login you can close this page</h1><script>window.close();</script ></body>'
                );
            } else {
                res.redirect(`${origin}service?github_token=${access_token}`);
            }
        } catch (error) {
            console.error('Error retrieving access token :', error);
            res.send('Error during token retrieval');
        }
    });
};
