import { Express } from 'express';
import axios from 'axios';
import { setUserName } from './Discord.query';
import { updateService } from '../../routes/services/services.query';

const client_id = process.env.DISCORD_CLIENT_ID!;
const client_secret = process.env.DISCORD_CLIENT_SECRET!;
const redirect_uri = 'http://localhost:8080/discord/callback';
const jwt = require('jsonwebtoken');

module.exports = (app: Express) => {
    app.get('/discord/login', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        console.log(origin);
        const scope = 'identify email guilds guilds.members.read bot';
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}`;
        res.redirect(authUrl);
    });

    app.get('/discord/login/:email', (req, res) => {
        let origin: string;
        if (req.headers.referer !== undefined) {
            origin = req.headers.referer;
        } else {
            origin = '';
        }
        if (req.params.email)
            origin += `_${req.params.email}`;
        console.log(origin);
        const scope = 'identify email guilds guilds.members.read bot';
        const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent("https://area.leafs-studio.com/discord/callback")}&response_type=code&state=${encodeURIComponent(origin)}&scope=${encodeURIComponent(scope)}`;
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
            redirect_uri: `${req.query.state}`.includes('@') ? "https://area.leafs-studio.com/discord/callback" : redirect_uri,
        });

        try {
            const response = await axios.post(
                tokenUrl,
                bodyParams,
                authOptions
            );
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
                    "discord_token"
                );
                await updateService(
                    email,
                    refresh_token,
                    "discord_refresh"
                );
                res.send("<body><h1>You are login you can close this page</h1><script>window.close();</script ></body>");
            } else {
                res.redirect(
                    `${origin}service?discord_token=${access_token}&discord_refresh=${refresh_token}`
                );
            }
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

    app.get('/discord/me', async (req, res) => {
        const accessToken = req.header('Authorization');
        if (!accessToken) {
            res.status(500).send('Pas de token');
            return;
        }
        let webToken = accessToken.toString().split(' ')[1];
        try {
            const response = await axios.get(
                'https://discord.com/api/users/@me',
                {
                    headers: {
                        Authorization: `Bearer ${webToken}`,
                    },
                }
            );

            const responseGuilds = await axios.get(
                'https://discord.com/api/users/@me/guilds',
                {
                    headers: {
                        Authorization: `Bearer ${webToken}`,
                    },
                }
            );

            const userData = response.data;
            const guildCount = responseGuilds.data.length;
            res.status(200).json({
                userData,
                guildCount,
            });
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des infos de l'utilisateur:",
                error
            );
            res.status(500).send(
                'Erreur lors de la récupération des informations utilisateur (discord)'
            );
        }
    });
    app.post('/discord/setUsername', async (req, res) => {
        console.log(req.body);
        const user_info = req.body;
        const decoded = jwt.verify(user_info.token, process.env.SECRET);

        const result = await setUserName(
            decoded.email,
            user_info.username,
            user_info.nbGuilds
        );
        if (!result) {
            res.status(400).json({
                msg: "Erreur lors de l'insertion du nom Discord de l'utilisateur ",
            });
        }
        res.status(200).json({
            msg: "le nom d'utilisateur Discord a bien été set",
        });
    });
};
