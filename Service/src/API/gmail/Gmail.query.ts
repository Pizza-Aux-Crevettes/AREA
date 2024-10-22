import dotenv from 'dotenv';
import * as base64 from 'base64-url';
import supabase from '../../config/db';
import e from 'express';

dotenv.config();

async function getLastMsg(msg_id: string, token: string) {
    let data;
    try {
        const result = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg_id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        data = await result.json();
    } catch (error) {
        console.error('error', error);
        return null;
    }
    return data;
}

export async function getGmailMsg(token: string) {
    let data;
    let res;
    try {
        const result = await fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }
        );

        data = await result.json();
        res = await getLastMsg(data.messages[0].threadId, token);
        return res;
    } catch (error) {
        console.error('error', error);
        return null;
    }
}

export async function sendGmail(token: string, dest: string) {
    const email = [
        `To: ${dest}`,
        'Subject: AREA: reaction',
        '',
        'Tu as un ou des mails pas ouverts °<3°'
    ].join('\n');
    const encodedMessage = base64.encode(email);

    try {
        const res = await fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ raw: encodedMessage }),
            }
        );
        if (!res.ok) {
            const errorInfo = await res.json();
            console.error('Error :', errorInfo);
            return null;
        }
        const result = await res.json();
        console.log('email send!', result);
        return result;
    } catch (error) {
        console.error('error when sending the email:', error);
        return null;
    }
}

export async function getRefreshGoogleToken(email: string): Promise<any> {
    try {
        const {data, error} = await supabase
            .from('Service')
            .select('google_refresh')
            .eq('user_email', email);
        if (error) {
            return "";
        }
        return data[0].google_refresh;
    } catch (e) {
        console.error('getRefreshGoogleToken', e);
        return "";
    }
}

export async function updateGoogleToken(email: string, access_token: string): Promise<boolean> {
    try {
        const {data, error} = await supabase.from('Service').update({
            google_token: access_token
        }).eq('user_email', email).select();
        return !error;

    } catch (error) {
        console.error('updateGoogleToken', e);
        return false;
    }
}
