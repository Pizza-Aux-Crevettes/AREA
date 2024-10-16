import { Express, Request, Response } from 'express';
import { getGmailMsg, sendGmail } from './Gmail.query';

export async function haveMail(token: string): Promise<any> {
    const result = await getGmailMsg(token);
    if (result === null) {
        console.error('Error when get email');
        return false;
    }
    if (result.labelIds[0] !== 'UNREAD') {
        console.error('Not new email');
        return false;
    }
    return true;
}

export async function sendMail(token: string, emailDest: string): Promise<any> {
    const result = await sendGmail(token, emailDest);
    if (result === null) {
        console.error('Error when send email');
        return;
    }
    return result;
}
