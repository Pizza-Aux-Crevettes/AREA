import dotenv from "dotenv";
import supabase from '../../config/db';
import e from 'express';

dotenv.config();

export async function sendDM(userId: string, message: string, discordClient: any): Promise<void> {
    try {
        const user = await discordClient.users.fetch(userId);
        await user.send(message);
    } catch (error) {
        throw new Error('cannot send the message');
    }
}

export async function getRefreshDiscordToken(email: string): Promise<any> {
    try {
        const {data, error} = await supabase
            .from('Service')
            .select('discord_refresh')
            .eq('user_email', email);
        if (error) {
            return "";
        }
        return data[0].discord_refresh;
    } catch (e) {
        console.error('getRefreshDiscordToken', e);
        return "";
    }
}

export async function updateDiscordToken(email: string, access_token: string, refresh_token: string): Promise<boolean> {
    try {
        const {data, error} = await supabase.from('Service').update({
            discord_refresh: refresh_token,
            discord_token: access_token
        }).eq('user_email', email).select();
        return !error;

    } catch (error) {
        console.error('updateDiscordToken', e);
        return false;
    }
}