import { Express } from "express";
import axios from 'axios';


const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:3000/callback';

module.exports = (app: Express) => {
    app.get('/login', (req, res) => {
        const scope = 'user-read-private user-read-email';
        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
        res.redirect(authUrl);
    });

    app.get('/callback', async (req, res) => {
        const code = req.query.code || null;

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
            },
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            json: true
        };

        try {
            const response = await axios.post(authOptions.url, null, {
                headers: authOptions.headers,
                params: authOptions.form
            });

            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;

            console.log(access_token);

            res.redirect(`http://localhost:5173?access_token=${access_token}`);
        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.send('Error during token retrieval');
        }
    });
}
