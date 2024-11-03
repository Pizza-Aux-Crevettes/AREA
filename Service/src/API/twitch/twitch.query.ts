import dotenv from 'dotenv';
import * as base64 from 'base64-url';
import supabase from '../../config/db';
import e from 'express';

dotenv.config();

async function getUserId(username: string, token: string) {
    let response;
    try {
        const result = await fetch(
            `https://api.twitch.tv/helix/users?login=${username}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    'Client-Id': process.env.TWITCH_CLIENT_ID!,
                },
            }
        );

        response = await result.json();
    } catch (error) {
        console.error('Error when getting twitch user id :', error);
        return null;
    }
    return response.data?.[0]?.id || null;
}

export async function clipTwitch(username: string, token: string) {
    const idUsername = await getUserId(username, token);
    let data;
    if (idUsername === null) {
        return;
    }
    try {
        const result = await fetch(
            `https://api.twitch.tv/helix/clips?broadcaster_id=${idUsername}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                    'Client-Id': process.env.TWITCH_CLIENT_ID!,
                },
            }
        );

        data = await result.json();
    } catch (error) {
        console.error('Error when getting twitch clip :', error);
        return null;
    }
    return data;
}

export async function getRefreshTwitchToken(email: string): Promise<any> {
    try {
        const { data, error } = await supabase
            .from('Service')
            .select('twitch_refresh')
            .eq('user_email', email);
        if (error) {
            return '';
        }
        return data[0].twitch_refresh;
    } catch (e) {
        console.error('Error when getting twitch refresh token :', e);
        return '';
    }
}

export async function updateTwitchToken(
    email: string,
    access_token: string
): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('Service')
            .update({
                twitch_token: access_token,
            })
            .eq('user_email', email)
            .select();
        return !error;
    } catch (error) {
        console.error('Error when updating twitch refresh token :', e);
        return false;
    }
}
