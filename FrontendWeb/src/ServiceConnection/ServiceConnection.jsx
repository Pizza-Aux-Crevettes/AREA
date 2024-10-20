import React, { useEffect, useState } from 'react';
import Cookies from 'cookies-js';
import Title from '../Title/Title';
import logo_discord from '../assets/discord.png';
import logo_X from '../assets/X.png';
import logo_spotify from '../assets/spotify.png';
import logo_google from '../assets/google.png';
import './ServiceConnection.css';
import { useLocation, useNavigate } from 'react-router-dom';

function RectangleService({ text, logo, Click, color_status }) {
    return (
        <div className="rectangle">
            <button
                onClick={Click}
                className="button-style"
                style={{ backgroundColor: color_status }}
            >
                <h3>
                    <strong>{text}</strong>
                </h3>
            </button>
            <img src={logo} className="logo-rect" />
        </div>
    );
}

const registerService = async (service) => {
    try {
        const response = await fetch('http://localhost:8080/api/user/me', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const json = await response.json();

        if (json && json.email) {
            const token = Cookies.get(service);
            const userEmail = json.email;
            fetch('http://localhost:8080/api/setNewToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: userEmail,
                    token: token,
                    service: service,
                }),
            })
                .then((response) => {
                    console.log(response.json);
                })
                .then(() => {});
        } else {
            console.error('userEmail is empty');
        }
    } catch (error) {
        console.error('An error occured', error);
    }
};

function Service() {
    const navigate = useNavigate();
    const location = useLocation();
    const [spotifyText, setSpotifyText] = useState('');
    const [googleText, setGoogleText] = useState('');
    const [xText, setXText] = useState('');
    const [discordText, setDiscordText] = useState('');

    const [spotifyStatus, setSpotifyStatus] = useState('');
    const [googleStatus, setGoogleStatus] = useState('');
    const [xStatus, setXStatus] = useState('');
    const [discordStatus, setDiscordStatus] = useState('');

    const [spotifyConnect, setSpotifyConnect] = useState(false);
    const [googleConnect, setGoogleConnect] = useState(false);
    const [xConnect, setXConnect] = useState(false);
    const [discordConnect, setDiscordConnect] = useState(false);
    useEffect(() => {
        if (Cookies.get('token') === null) {
            navigate('/');
            location.pathname = '/';
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let token = '';
        const serviceList = [
            'spotify_token',
            'x_token',
            'google_token',
            'discord_token',
            'discord_refresh',
            'spotify_refresh',
            'google_refresh',
        ];

        for (let i = 0; i < serviceList.length; i++) {
            token = params.get(serviceList[i]);
            if (token) {
                Cookies.set(serviceList[i], token);
                if (Cookies.get(serviceList[i]))
                    registerService(serviceList[i]);
            }
        }
        clearUrl();
        window.history.replaceState(null, '', window.location.pathname);
        if (Cookies.get('spotify_token')) {
            console.log(Cookies.get('spotify_token'));
            setSpotifyText('disconnection of Spotify');
            setSpotifyStatus('#3AB700');
            setSpotifyConnect(true);
        } else {
            setSpotifyText('Connect to Spotify');
            setSpotifyStatus('#33478f');
            setSpotifyConnect(false);
        }

        if (Cookies.get('x_token')) {
            setXText('disconnection of X');
            setXStatus('#3AB700');
            setXConnect(true);
        } else {
            setXText('Connect to X');
            setXStatus('#33478f');
            setXConnect(false);
        }

        if (Cookies.get('google_token')) {
            setGoogleText('disconnection of Google');
            setGoogleStatus('#3AB700');
            setGoogleConnect(true);
        } else {
            setGoogleText('Connect to Google');
            setGoogleStatus('#33478f');
            setGoogleConnect(false);
        }

        if (Cookies.get('discord_token')) {
            setDiscordText('disconnection of Discord');
            setDiscordStatus('#3AB700');
            setDiscordConnect(true);
        } else {
            setDiscordText('Connect to Discord');
            setDiscordStatus('#33478f');
            setDiscordConnect(false);
        }
    }, [navigate, location]);

    const clearUrl = () => {
        const url = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, url);
    };

    const handleClick = (service, isConnected) => {
        if (isConnected) {
            let userToken = Cookies.get('token');
            if (userToken) {
                fetch('http://localhost:8080/api/user/me', {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + Cookies.get('token'),
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {
                        const email = json.email;
                        const tokenService = Cookies.get(service + '_token');
                        if (tokenService && service !== 'spotify') {
                            fetch(`http://localhost:8080/${service}/revoke`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    token: tokenService,
                                }),
                            }).then((response) => {
                                if (response.ok) {
                                    Cookies.set(service + '_token', '', {
                                        expires: -1,
                                    });
                                    Cookies.set(service + '_refresh', '', {
                                        expires: -1,
                                    });
                                    fetch(
                                        'http://localhost:8080/api/setNewToken',
                                        {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type':
                                                    'application/json',
                                            },
                                            body: JSON.stringify({
                                                userEmail: email,
                                                token: '',
                                                service: service + '_token',
                                            }),
                                        }
                                    ).then((response) => {
                                        if (response.ok) {
                                            fetch(
                                                'http://localhost:8080/api/setNewToken',
                                                {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type':
                                                            'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        userEmail: email,
                                                        token: '',
                                                        service:
                                                            service +
                                                            '_refresh',
                                                    }),
                                                }
                                            ).then(() => {
                                                window.location.reload();
                                            });
                                        }
                                    });
                                }
                            });
                        } else if (tokenService && service === 'spotify') {
                            Cookies.set(service + '_token', '', {
                                expires: -1,
                            });
                            Cookies.set(service + '_refresh', '', {
                                expires: -1,
                            });
                            fetch('http://localhost:8080/api/setNewToken', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    userEmail: email,
                                    token: '',
                                    service: service + '_token',
                                }),
                            }).then(() => {
                                fetch('http://localhost:8080/api/setNewToken', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        userEmail: email,
                                        token: '',
                                        service: service + '_refresh',
                                    }),
                                }).then(() => {
                                    window.location.reload();
                                });
                            });
                        }
                    });
            }
        } else {
            window.location.href =
                'http://localhost:8080/' + service + '/login/';
        }
    };

    return (
        <div className="service">
            <div className="all-container">
                <Title title="Service Connection" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className="column-container">
                            <RectangleService
                                text={discordText}
                                logo={logo_discord}
                                Click={() =>
                                    handleClick('discord', discordConnect)
                                }
                                color_status={discordStatus}
                            />
                            <RectangleService
                                text={googleText}
                                logo={logo_google}
                                Click={() =>
                                    handleClick('google', googleConnect)
                                }
                                color_status={googleStatus}
                            />
                        </div>
                        <div className="column-container">
                            <RectangleService
                                text={xText}
                                logo={logo_X}
                                Click={() => handleClick('twitter', xConnect)}
                                color_status={xStatus}
                            />
                            <RectangleService
                                text={spotifyText}
                                logo={logo_spotify}
                                Click={() =>
                                    handleClick('spotify', spotifyConnect)
                                }
                                color_status={spotifyStatus}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
