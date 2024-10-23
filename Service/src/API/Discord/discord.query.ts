import dotenv from 'dotenv';
import supabase from '../../config/db';
import e from 'express';
import axios from 'axios';

dotenv.config();

export async function sendDM(
    userId: string,
    message: string,
    discordClient: any
): Promise<void> {
    try {
        const user = await discordClient.users.fetch(userId);
        await user.send(message);
    } catch (error) {
        throw new Error('cannot send the message');
    }
}

export async function getRefreshDiscordToken(email: string): Promise<any> {
    try {
        const { data, error } = await supabase
            .from('Service')
            .select('discord_refresh')
            .eq('user_email', email);
        if (error) {
            return '';
        }
        return data[0].discord_refresh;
    } catch (e) {
        console.error('getRefreshDiscordToken', e);
        return '';
    }
}

export async function updateDiscordToken(
    email: string,
    access_token: string,
    refresh_token: string
): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('Service')
            .update({
                discord_refresh: refresh_token,
                discord_token: access_token,
            })
            .eq('user_email', email)
            .select();
        return !error;
    } catch (error) {
        console.error('update Discord Token', e);
        return false;
    }
}

export async function updateUserName(
    NewUserName: string,
    email: string
): Promise<any> {
    try {
        const { error } = await supabase
            .from('DiscordUserDatas')
            .update({
                username: NewUserName,
            })
            .eq('email', email)
            .select();
        return !error;
    } catch (error) {
        console.error('update Discord Username', e);
        return false;
    }
}

export async function getUserName(email: string): Promise<any> {
    try {
        const { data, error } = await supabase
            .from('DiscordUserDatas')
            .select('username')
            .eq('email', email)
            .select();
        return data;
    } catch (error) {
        console.error('update Discord Username', e);
        return false;
    }
}

export async function discordUserMe(token: string) {
    if (token !== null) {
        try {
            const response = await axios.get(
                'https://discord.com/api/users/@me',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;

        } catch (error) {
            console.error(
                "Erreur lors de la récupération des infos de l'utilisateur:",
                error
            );
        }
    }
}

export async function getNbGuilds(email: string) : Promise<any> {
    try {
        const { data } = await supabase
            .from('DiscordUserDatas')
            .select('nbGuilds')
            .eq('email', email)
            .select();
        return data;
    } catch (error) {
        console.error('get user guilds', e);
        return false;
    }
}

export async function updateBDGuilds(email: string, nb: number) : Promise<any> {
    try {
        const { error } = await supabase
            .from('DiscordUserDatas')
            .update({
                nbGuilds: nb,
            })
            .eq('email', email)
            .select();
        return !error;
    } catch (error) {
        console.error('update Discord Username', e);
        return false;
    }
}

export async function getActualNbGuilds(token: string) {
    if (token !== null) {
        try {
            const response = await axios.get(
                'https://discord.com/api/users/@me/guilds',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error(
                "Error when change the user name: ",
                error
            );
        }
    } else {
        console.error("Token is null or undefined");
    }
}
