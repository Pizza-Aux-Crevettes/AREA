import { getGmailMsg, getRefreshGoogleToken, sendGmail, updateGoogleToken } from './Gmail.query';
import axios from 'axios';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export async function haveMail(email: string, token: string): Promise<any> {
    const result = await getGmailMsg(token);
    if (result === null) {
        console.error('Error when get email');
        await refreshGmailToken(email);
        return false;
    }
    if (result.labelIds[0] !== 'UNREAD') {
        console.error('Not new email');
        return false;
    }
    return true;
}

export async function sendMail(email: string, token: string, emailDest: string): Promise<any> {
    const result = await sendGmail(token, emailDest);
    if (result === null) {
        console.error('Error when send email');
        await refreshGmailToken(email);
        return;
    }
    return result;
}

export async function refreshGmailToken(email: string) {
    const refresh_token = await getRefreshGoogleToken(email);

    try {
        const response = await axios.post(`https://oauth2.googleapis.com/token?grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {}, {headers: { 'Content-Type': 'application/x-www-form-urlencoded'}});

        if (response.data) {
            const new_access_token = response.data.access_token;
            console.log(new_access_token);
            await updateGoogleToken(email, new_access_token);
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
    }
}