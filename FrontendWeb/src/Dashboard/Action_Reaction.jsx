import './Dashboard.css';
import Cookies from 'cookies-js';

const getGmailMsg = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/gmail/msg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            }),
        });
        const data = await response.json();
        if (data.msg === 'Not new emails') {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error);
    }
};

const SendEmail = async (token, dest) => {
    try {
        const response = await fetch('http://localhost:3000/api/gmail/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                dest: dest,
            }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const getWeather = async (forJson) => {
    try {
        const response = await fetch('http://localhost:8080/api/Weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                forJson,
            }),
        });
        const res = await response.json();
        console.log(res)
        return res;
    } catch (error) {
        console.log(error);
    }
};

const playPreview = async () => {
    const response = await fetch(
        `https://api.spotify.com/v1/tracks/5Qnrgqy1pAm9GyNQOgyVFz`,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get('spotify_token')}`,
            },
        }
    );
    const data = await response.json();
    const previewUrl = data.preview_url;

    if (previewUrl) {
        const audio = new Audio(previewUrl);
        audio.play();
    } else {
        console.log('No preview available for this song.');
    }
};


export const applyActions = async (action, forJson) => {
    console.log(action, "&", forJson)
    const google_token = Cookies.get('google_token');

    if (action === 'Email' && google_token !== '') {
        const data = await getGmailMsg(google_token);
        return data;
    } else if (action === 'Weather') {
        const res = await getWeather(forJson);
        return res;
    } else {
        return false;
    }
};

export const applyReactions = (reaction) => {
    const google_token = Cookies.get('google_token');
    if (reaction === 'Spotify') {
        playPreview();
    } else if (reaction === 'sendEmail') {
        SendEmail(google_token, "anast.bouby@icloud.com");
    }
    return;
};
