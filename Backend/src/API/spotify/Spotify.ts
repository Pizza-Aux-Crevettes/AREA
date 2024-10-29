import { Express } from 'express';
import axios from 'axios';
import { updateService } from '../../routes/services/services.query';

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/spotify/callback';

module.exports = (app: Express) => {
    app.get('/spotify/login', (req, res) => {
        const scope =
            'user-read-private user-read-email user-modify-playback-state';
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
            scope
        )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        res.redirect(authUrl);
    });

    app.get('/spotify/login/:email', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        if (req.params.email)
            origin += `_${req.params.email}`;
        const scope =
            'user-read-private user-read-email user-modify-playback-state';
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
            scope
        )}&redirect_uri=${encodeURIComponent('https://area.leafs-studio.com/spotify/callback')}&state=${encodeURIComponent(origin)}`;
        res.redirect(authUrl);
    });

    app.get('/spotify/callback', async (req, res) => {
        const code = req.query.code || null;

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization:
                    'Basic ' +
                    Buffer.from(`${client_id}:${client_secret}`).toString(
                        'base64'
                    ),
            },
            form: {
                code: code,
                redirect_uri: `${req.query.state}`.includes('@') ? "http://10.0.2.2:8080/spotify/callback" : redirect_uri,
                grant_type: 'authorization_code',
            },
            json: true,
        };

        try {
            const response = await axios.post(authOptions.url, null, {
                headers: authOptions.headers,
                params: authOptions.form,
            });

            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            let state: any = req.query.state;
            state = state.split('_');
            const origin = state[0];
            if (req.headers['user-agent']?.toLowerCase()?.includes('android')) {
                const email = state[1];
                await updateService(
                    email,
                    access_token,
                    "spotify_token"
                );
                await updateService(
                    email,
                    refresh_token,
                    "spotify_refresh"
                );
                res.send("<script>window.close();</script > ");
            } else {
                res.redirect(
                    `${origin}service?spotify_token=${access_token}&spotify_refresh=${refresh_token}`
                );
            }
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });
};
