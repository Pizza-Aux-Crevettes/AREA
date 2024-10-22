import { Express } from 'express';
import axios from 'axios';

const client_id = process.env.GOOGLE_CLIENT_ID!;
const client_secret = process.env.GOOGLE_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/google/callback';

module.exports = (app: Express) => {
    app.get('/google/login', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        const scope =
            'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(origin)}&access_type=offline&prompt=consent`;
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
            const origin = req.query.state;
            res.redirect(
                `${origin}service?google_token=${access_token}&google_refresh=${refresh_token}`
            );
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });

    app.post('/google/revoke', async (req, res) => {
        const token = req.body.token;
        if (!token) {
            return res
                .status(400)
                .send('Le token est requis pour la révocation.');
        }

        const revokeUrl = 'https://oauth2.googleapis.com/revoke';

        try {
            const response = await axios.post(revokeUrl, null, {
                params: {
                    token: token,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`, // Authentification via Bearer Token
                },
            });

            if (response.status === 200) {
                console.log('Token révoqué avec succès pour Google.');
                return res.json({
                    message: 'Token révoqué avec succès pour Google.',
                });
            } else {
                console.error(
                    'Erreur lors de la révocation du token pour Google.'
                );
                return res
                    .status(500)
                    .send('Erreur lors de la révocation du token pour Google.');
            }
        } catch (error) {
            console.error(
                'Erreur lors de la révocation du token pour Google :',
                error
            );
            return res
                .status(500)
                .send('Erreur lors de la révocation du token pour Google.');
        }
    });
};
