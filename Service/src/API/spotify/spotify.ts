import axios from 'axios';
import { getRefreshSpotifyToken, updateSpotifyToken } from './spotify.query';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

export async function playSong(email: string, token: string): Promise<boolean> {
    try {
        const response = await axios.put(
            `https://api.spotify.com/v1/me/player/play`,
            {
                uris: [`spotify:track:257QsPbjO4QmZu4ixJTg6y`]
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.status === 204;
    } catch (e) {
        console.error(e);
        await refreshSpotifyToken(email);
        return false;
    }
}

export async function refreshSpotifyToken(email: string) {
    const refresh_token = await getRefreshSpotifyToken(email);

    try {
        const response = await axios.post(`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {}, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}});

        if (response.data) {
            const new_access_token = response.data.access_token;
            await updateSpotifyToken(email, new_access_token);
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
}