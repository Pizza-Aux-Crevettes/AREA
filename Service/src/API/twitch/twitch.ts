import {
    clipTwitch,
    getRefreshTwitchToken,
    updateTwitchToken,
} from './twitch.query';
import axios from 'axios';

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

export async function createClipTwitch(
    username: string,
    token: string
): Promise<any> {
    const result = await clipTwitch(username, token);
    if (result !== null) {
        return result;
    }
    console.error('Streamer is not streaming');
    return false;
}

export async function refreshTokenOfTwitch(email: string) {
    const refresh_token: string = await getRefreshTwitchToken(email);
    const qs = require('qs');
    let data = qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: `${refresh_token}`,
        client_id: `${CLIENT_ID}`,
        client_secret: `${CLIENT_SECRET}`,
    });
    const authOptions = {
        url: 'https://id.twitch.tv/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'post',
        data: data,
    };

    try {
        const response = await axios.request(authOptions);

        const access_token = response.data.access_token;
        if (response.data) {
            const result = await updateTwitchToken(email, access_token);
        }
    } catch (error) {
        console.error('Error refreshing access token :', error);
    }
}
