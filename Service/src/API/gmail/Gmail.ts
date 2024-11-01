import {
    getGmailMsg,
    getRefreshGoogleToken,
    sendGmail,
    updateGoogleToken,
    insertCalEvent,
} from './Gmail.query';
import axios from 'axios';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export async function haveMail(email: string, token: string): Promise<any> {
    const result = await getGmailMsg(token, email);
    if (result === null) {
        console.error('Error when get email');
        await refreshGmailToken(email);
        return false;
    } else if (result === '') {
        console.error('This email is already check');
        return false;
    } else if (result.labelIds[0] !== 'UNREAD') {
        console.error('Not new email');
        return false;
    } else {
        return true;
    }
}

export async function sendMail(
    email: string,
    token: string,
    infoMail: string
): Promise<any> {
    const firstSpaceIndex = infoMail.indexOf(' ');
    const emailDest = infoMail.substring(0, firstSpaceIndex);
    const emailMess = infoMail.substring(firstSpaceIndex + 1);
    const result = await sendGmail(token, emailDest, emailMess);
    if (result === null) {
        console.error('Error when send email');
        await refreshGmailToken(email);
        return;
    }
    return result;
}

export async function createCalEvent(
    token: string,
    email: string,
    title: string
) {
    const result = await insertCalEvent(token, email, title);
    if (result === null) {
        console.error('Error when set event');
        await refreshGmailToken(email);
        return;
    }
    return result;
}

export async function refreshGmailToken(email: string) {
    const refresh_token = await getRefreshGoogleToken(email);

    try {
        const response = await axios.post(
            `https://oauth2.googleapis.com/token?grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            {},
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        if (response.data) {
            const new_access_token = response.data.access_token;
            await updateGoogleToken(email, new_access_token);
        }
    } catch (error) {
        console.error('Error refreshing access token :', error);
    }
}
