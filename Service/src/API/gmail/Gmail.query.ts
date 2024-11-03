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

export async function getGmailMsg(token: string, email: string) {
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
        const isAlreadyCheck = await alreadyCheck(
            data.messages[0].threadId,
            email
        );
        if (!isAlreadyCheck) {
            await setMailInDB(data.messages[0].threadId, email);
            res = await getLastMsg(data.messages[0].threadId, token);
            return res;
        } else {
            return '';
        }
    } catch (error) {
        console.error('error', error);
        return null;
    }
}

export async function sendGmail(token: string, dest: string, mess: string) {
    const email = [`To: ${dest}`, 'Subject: AREA: reaction', '', mess].join(
        '\n'
    );
    const encodedMessage = base64.encode(email);

    try {
        const res = await fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages/send',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
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
        return result;
    } catch (error) {
        console.error('Error when sending the email :', error);
        return null;
    }
}

export async function insertCalEvent(
    token: string,
    idCalendar: string,
    title: string
) {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 10);

    const formatDate = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const sign = offset > 0 ? '-' : '+';
        const absOffset = Math.abs(offset);
        const hours = String(Math.floor(absOffset / 60)).padStart(2, '0');
        const minutes = String(absOffset % 60).padStart(2, '0');
        const timezone = `${sign}${hours}:${minutes}`;

        return date.toISOString().replace('Z', timezone).split('.')[0];
    };

    const content = {
        summary: title,
        start: {
            dateTime: formatDate(start),
            timeZone: 'Europe/Paris',
        },
        end: {
            dateTime: formatDate(end),
            timeZone: 'Europe/Paris',
        },
    };

    try {
        const res = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${idCalendar}/events`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            }
        );
        if (!res.ok) {
            const errorInfo = await res.json();
            console.error('Error :', errorInfo.error);
            return null;
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Rrror when setting the event :', error);
        return null;
    }
}

export async function getRefreshGoogleToken(email: string): Promise<any> {
    try {
        const { data, error } = await supabase
            .from('Service')
            .select('google_refresh')
            .eq('user_email', email);
        if (error) {
            return '';
        }
        return data[0].google_refresh;
    } catch (e) {
        console.error('Error when getting refresh Google token :', e);
        return '';
    }
}

export async function updateGoogleToken(
    email: string,
    access_token: string
): Promise<boolean> {
    try {
        const { data, error } = await supabase
            .from('Service')
            .update({
                google_token: access_token,
            })
            .eq('user_email', email)
            .select();
        return !error;
    } catch (error) {
        console.error('Error when updating Google token :', e);
        return false;
    }
}

async function alreadyCheck(IdEmail: string, email: string) {
    const lastId: any = await getLastId(email);
    if (lastId !== null && lastId.length > 0) {
        return lastId[0].lastIdEmail === IdEmail;
    }
    return false;
}

async function getLastId(email: string) {
    try {
        const { data } = await supabase
            .from('LastUserEmail')
            .select('lastIdEmail')
            .eq('userEmail', email);
        return data;
    } catch (error) {
        console.error('Error when getting last email id in db :', error);
        return '';
    }
}

async function setMailInDB(IdEmail: string, email: string) {
    const alreadyExist = await UserAlreadyExist(email);
    if (alreadyExist) {
        updateEmailId(IdEmail, email);
    } else {
        setEmailId(IdEmail, email);
    }
}

async function UserAlreadyExist(email: string): Promise<boolean> {
    try {
        const { data } = await supabase
            .from('LastUserEmail')
            .select('userEmail')
            .eq('userEmail', email);
        if (data === null || data.length === 0) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}
async function updateEmailId(IdEmail: string, email: string) {
    try {
        await supabase
            .from('LastUserEmail')
            .update([{ lastIdEmail: IdEmail }])
            .eq('userEmail', email)
            .select();
    } catch (error) {
        console.error('Error when updating email Id in db :', e);
    }
}
async function setEmailId(IdEmail: string, email: string) {
    try {
        await supabase
            .from('LastUserEmail')
            .insert([{ userEmail: email, lastIdEmail: IdEmail }])
            .select();
    } catch (error) {
        console.error('Error when setting email Id in db :', e);
    }
}
