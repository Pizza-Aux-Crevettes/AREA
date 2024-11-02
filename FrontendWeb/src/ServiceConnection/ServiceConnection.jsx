import React, { useEffect, useState } from 'react';
import Cookies from 'cookies-js';
import Title from '../Title/Title';
import logo_discord from '../assets/discord.png';
import logo_twitch from '../assets/twitch.png';
import logo_spotify from '../assets/spotify.png';
import logo_google from '../assets/google.png';
import logo_github from '../assets/github.png';
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

const registerService = async (service, service_token) => {
    const apiUrl = localStorage.getItem('userInputIP');

    try {
        const response = await fetch(`${apiUrl}/api/user/me`, {
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
            const userEmail = json.email;
            fetch('http://localhost:8080/api/setNewToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
                body: JSON.stringify({
                    userEmail: userEmail,
                    token: service_token,
                    service: service,
                }),
            })
                .then((response) => {})
                .then(() => {});
        } else {
            console.error('UserEmail is empty');
        }
    } catch (error) {
        console.error('An error occured :', error);
    }
};

function Service() {
    const navigate = useNavigate();
    const location = useLocation();
    const [spotifyText, setSpotifyText] = useState('');
    const [googleText, setGoogleText] = useState('');
    const [twitchText, setTwitchText] = useState('');
    const [discordText, setDiscordText] = useState('');
    const [githubText, setGithubText] = useState('');

    const [spotifyStatus, setSpotifyStatus] = useState('');
    const [googleStatus, setGoogleStatus] = useState('');
    const [twitchStatus, setTwitchStatus] = useState('');
    const [discordStatus, setDiscordStatus] = useState('');
    const [githubStatus, setGithubStatus] = useState('');

    const [spotifyConnect, setSpotifyConnect] = useState(false);
    const [googleConnect, setGoogleConnect] = useState(false);
    const [twitchConnect, setTwitchConnect] = useState(false);
    const [discordConnect, setDiscordConnect] = useState(false);
    const [githubConnect, setGithubConnect] = useState(false);

    const apiUrl = localStorage.getItem('userInputIP');

    const serviceList = [
        'spotify_token',
        'twitch_token',
        'google_token',
        'discord_token',
        'github_token',
        'discord_refresh',
        'spotify_refresh',
        'google_refresh',
        'twitch_refresh',
    ];

    useEffect(() => {
        if (Cookies.get('token') === null) {
            navigate('/');
            location.pathname = '/';
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let token = '';

        loadService();

        for (let i = 0; i < serviceList.length; i++) {
            token = params.get(serviceList[i]);
            if (token) {
                localStorage.setItem(serviceList[i], 'true');
                if (localStorage.getItem(serviceList[i]) === 'true') {
                    registerService(serviceList[i], token);
                    if (serviceList[i] === 'discord_token') {
                        fetch(`${apiUrl}/discord/me`, {
                            method: 'GET',
                            headers: {
                                Authorization: 'Bearer ' + token,
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((response) => {
                                return response.json();
                            })
                            .then((json) => {
                                setUsernameDiscordInDB(
                                    json.userData.username,
                                    json.guildCount
                                );
                            });
                    }
                }
            }
        }

        clearUrl();
        window.history.replaceState(null, '', window.location.pathname);
        defineStatusService();
    }, [navigate, location]);

    const setUsernameDiscordInDB = async (userName, nbGuilds) => {
        fetch(`${apiUrl}/discord/setUsername`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: Cookies.get('token'),
                username: userName,
                nbGuilds: nbGuilds,
            }),
        });
    };

    const defineStatusService = async () => {
        if (localStorage.getItem('spotify_token') === 'true') {
            setSpotifyText('Disconnection of Spotify');
            setSpotifyStatus('#3AB700');
            setSpotifyConnect(true);
        } else {
            setSpotifyText('Connect to Spotify');
            setSpotifyStatus('#33478f');
            setSpotifyConnect(false);
        }

        if (localStorage.getItem('twitch_token') === 'true') {
            setTwitchText('Disconnection of Twitch');
            setTwitchStatus('#3AB700');
            setTwitchConnect(true);
        } else {
            setTwitchText('Connect to Twitch');
            setTwitchStatus('#33478f');
            setTwitchConnect(false);
        }

        if (localStorage.getItem('google_token') === 'true') {
            setGoogleText('Disconnection of Google');
            setGoogleStatus('#3AB700');
            setGoogleConnect(true);
        } else {
            setGoogleText('Connect to Google');
            setGoogleStatus('#33478f');
            setGoogleConnect(false);
        }

        if (localStorage.getItem('discord_token') === 'true') {
            setDiscordText('Disconnection of Discord');
            setDiscordStatus('#3AB700');
            setDiscordConnect(true);
        } else {
            setDiscordText('Connect to Discord');
            setDiscordStatus('#33478f');
            setDiscordConnect(false);
        }
        if (localStorage.getItem('github_token') === 'true') {
            setGithubText('Disconnection of Github');
            setGithubStatus('#3AB700');
            setGithubConnect(true);
        } else {
            setGithubText('Connect to Github');
            setGithubStatus('#33478f');
            setGithubConnect(false);
        }
    };

    const loadService = async () => {
        const token = Cookies.get('token');
        fetch(`${apiUrl}/api/user/me`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                fetch(`${apiUrl}/api/getToken`, {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_email: json.email }),
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((tokenList) => {
                        for (let i = 0; i < serviceList.length; i++) {
                            if (tokenList[0][`${serviceList[i]}`] !== null) {
                                console.debug(
                                    serviceList[i],
                                    tokenList[0][`${serviceList[i]}`]
                                );
                                localStorage.setItem(serviceList[i], 'true');
                            } else {
                                localStorage.setItem(serviceList[i], 'false');
                            }
                        }
                        defineStatusService();
                    });
            });
    };

    const clearUrl = () => {
        const url = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, url);
    };

    const handleClick = (service, isConnected) => {
        if (isConnected) {
            let userToken = Cookies.get('token');
            if (userToken) {
                fetch(`${apiUrl}/api/user/me`, {
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
                        if (service !== 'github') {
                            localStorage.removeItem(service + '_refresh');
                        }
                        localStorage.removeItem(service + '_token');
                        if (service.toLowerCase() === 'discord') {
                            fetch(`${apiUrl}/discord/username`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${Cookies.get('token')}`,
                                },
                            }).then((res) => {});
                        }
                        fetch(`${apiUrl}/api/setNewToken`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${Cookies.get('token')}`,
                            },
                            body: JSON.stringify({
                                userEmail: email,
                                token: '',
                                service: service + '_token',
                            }),
                        }).then(() => {
                            if (service !== 'github') {
                                fetch(`${apiUrl}/api/setNewToken`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${Cookies.get('token')}`,
                                    },
                                    body: JSON.stringify({
                                        userEmail: email,
                                        token: '',
                                        service: service + '_refresh',
                                    }),
                                }).then(() => {
                                    window.location.reload();
                                });
                            } else {
                                window.location.reload();
                            }
                        });
                    });
            }
        } else {
            window.location.href = `${apiUrl}/` + service + '/login/';
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
                                text={githubText}
                                logo={logo_github}
                                Click={() =>
                                    handleClick('github', githubConnect)
                                }
                                color_status={githubStatus}
                            />
                        </div>
                        <div className="column-container">
                            <RectangleService
                                text={twitchText}
                                logo={logo_twitch}
                                Click={() =>
                                    handleClick('twitch', twitchConnect)
                                }
                                color_status={twitchStatus}
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
