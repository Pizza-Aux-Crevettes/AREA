import { Express, Request, Response } from 'express';
import { sendTweet } from './X.query';
import axios from 'axios';

const client_id = process.env.X_CLIENT_ID!;
const client_secret = process.env.X_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/twitter/callback';

module.exports = (app: Express) => {
    app.get('/twitter/login', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        const scope = 'tweet.read users.read offline.access';
        const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}&state=random_string&code_challenge=challenge_code&code_challenge_method=plain`;
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

            const origin = req.query.state;
            res.redirect(
                `${origin}service?x_token=${access_token}&x_refresh=${refresh_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });

    app.get('/twitter/refresh_token', async (req, res) => {
        const refresh_token = req.query.refresh_token || null;

        const authOptions = {
            url: 'https://api.twitter.com/2/oauth2/token',
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

    app.post('/twitter/revoke', async (req, res) => {
        const token = req.body.token;

        if (!token) {
            return res
                .status(400)
                .send('Le token est requis pour la révocation.');
        }

        const revokeUrl = 'https://api.twitter.com/1.1/oauth2/invalidate_token'; // URL fictive, veuillez vérifier la bonne URL dans la documentation officielle

        try {
            const response = await axios.post(revokeUrl, null, {
                headers: {
                    Authorization: `Bearer ${token}`, // Authentification via Bearer Token
                },
            });

            if (response.status === 200) {
                console.log('Token révoqué avec succès pour X (Twitter).');
                return res.json({
                    message: 'Token révoqué avec succès pour X (Twitter).',
                });
            } else {
                console.error(
                    'Erreur lors de la révocation du token pour X (Twitter).'
                );
                return res
                    .status(500)
                    .send(
                        'Erreur lors de la révocation du token pour X (Twitter).'
                    );
            }
        } catch (error) {
            console.error(
                'Erreur lors de la révocation du token pour X (Twitter) :',
                error
            );
            return res
                .status(500)
                .send(
                    'Erreur lors de la révocation du token pour X (Twitter).'
                );
        }
    });

    app.post('/api/twitter/send', async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const info = req.body;
        const result = await sendTweet(info.token, info.tweetText);
        if (result === null) {
            res.status(500).json({
                msg: 'Error when sending the tweet',
            });
            return;
        }
        res.status(200).json(result);
    });
};
