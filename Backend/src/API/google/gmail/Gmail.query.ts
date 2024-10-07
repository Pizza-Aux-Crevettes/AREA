import dotenv from 'dotenv';

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
    } catch (error) {
        console.error('error', error);
        return null;
    }
    return res;
}
