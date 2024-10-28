import { Express, Request, Response } from 'express';
import axios from 'axios';
import { delMailUser } from './Google.query';
import { auth } from '../../middleware/auth';

const jwt = require('jsonwebtoken');

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

    app.post('/api/DelEmailUser', auth, async (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        const user_infos = req.body;
        let decoded = jwt.verify(user_infos.token, process.env.SECRET);
        const result = await delMailUser(decoded.email);

        if (result === null) {
            res.status(400).json({ msg: 'Cannot delete the Email' });
        }
        res.status(200).json({
            msg: 'Email deleted successfully.',
        });
    });
};
