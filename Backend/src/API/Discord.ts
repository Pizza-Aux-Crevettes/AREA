import { Express } from 'express';
import axios from 'axios';

const client_id = process.env.DISCORD_CLIENT_ID!;
const client_secret = process.env.DISCORD_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/discord/callback';

module.exports = (app: Express) => {
    app.get('/discord/login', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        const scope = 'identify email';
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}`;
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
            const origin = req.query.state;
            res.redirect(
                `${origin}service?discord_token=${access_token}&discord_refresh=${refresh_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });

    app.get('/discord/refresh_token', async (req, res) => {
        const refresh_token = req.query.refresh_token || null;

        const authOptions = {
            url: 'https://discord.com/api/oauth2/token',
            headers: {
                Authorization:
                    'Basic ' +
                    Buffer.from(`${client_id}:${client_secret}`).toString(
                        'base64'
                    ),
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: client_id,
                client_secret: client_secret,
            },
            json: true,
        };

        try {
            const response = await axios.post(authOptions.url, null, {
                headers: authOptions.headers,
                params: authOptions.form,
            });

            const new_access_token = response.data.access_token;
            const expires_in = response.data.expires_in;
            const new_refresh_token =
                response.data.refresh_token || refresh_token;

            res.json({
                access_token: new_access_token,
                refresh_token: new_refresh_token,
                expires_in: expires_in,
            });
        } catch (error) {
            console.error('Error refreshing access token:', error);
            res.status(500).send('Erreur lors du rafraîchissement du token');
        }
    });

    app.get('/discord/refresh_token', async (req, res) => {
        const refresh_token = req.query.refresh_token || null;

        const authOptions = {
            url: 'https://discord.com/api/oauth2/token',
            headers: {
                Authorization:
                    'Basic ' +
                    Buffer.from(`${client_id}:${client_secret}`).toString(
                        'base64'
                    ),
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: client_id,
                client_secret: client_secret,
            },
            json: true,
        };

        try {
            const response = await axios.post(authOptions.url, null, {
                headers: authOptions.headers,
                params: authOptions.form,
            });

            const new_access_token = response.data.access_token;
            const expires_in = response.data.expires_in;
            const new_refresh_token =
                response.data.refresh_token || refresh_token;

            res.json({
                access_token: new_access_token,
                refresh_token: new_refresh_token,
                expires_in: expires_in,
            });
        } catch (error) {
            console.error('Error refreshing access token:', error);
            res.status(500).send('Erreur lors du rafraîchissement du token');
        }
    });

    app.post('/discord/revoke', async (req, res) => {
        const token = req.body.token;

        if (!token) {
            return res
                .status(400)
                .send('Le token est requis pour la révocation.');
        }

        const authOptions = {
            url: 'https://discord.com/api/oauth2/token/revoke',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: `client_id=${client_id}&client_secret=${client_secret}&token=${token}`,
        };

        try {
            const response = await axios.post(
                authOptions.url,
                authOptions.data,
                {
                    headers: authOptions.headers,
                }
            );

            if (response.status === 200) {
                console.log('Token révoqué avec succès.');
                return res.json({ message: 'Token révoqué avec succès.' });
            } else {
                console.error('Erreur lors de la révocation du token.');
                return res
                    .status(500)
                    .send('Erreur lors de la révocation du token.');
            }
        } catch (error) {
            console.error('Erreur lors de la révocation du token :', error);
            return res
                .status(500)
                .send('Erreur lors de la révocation du token.');
        }
    });
};
