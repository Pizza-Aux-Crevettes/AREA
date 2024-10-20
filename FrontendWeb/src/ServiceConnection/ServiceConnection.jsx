import React, { useEffect, useState } from 'react';
import Cookies from 'cookies-js';
import Title from '../Title/Title';
import logo_discord from '../assets/discord.png';
import logo_X from '../assets/X.png';
import logo_spotify from '../assets/spotify.png';
import logo_google from '../assets/google.png';
import './ServiceConnection.css';
import { useLocation, useNavigate } from 'react-router-dom';

function RectangleService({ text, logo, Click }) {
    return (
        <div className="rectangle">
            <button onClick={Click} className="button-style">
                <h3 dangerouslySetInnerHTML={{ __html: text }} />
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
    useEffect(() => {
        console.log('COOKIES = ', Cookies.get('token'));
        if (Cookies.get('token') === null) {
            navigate('/');
            location.pathname = '/';
        }
        const search = window.location.search;
        const params = new URLSearchParams(search);
        console.log(params);
        let token = '';
        const serviceList = [
            'spotify_token',
            'x_token',
            'google_token',
            'discord_token',
            'discord_refresh',
            "spotify_refresh",
            "google_refresh"
        ];
        for (let i = 0; i < serviceList.length; i++) {
            token = params.get(serviceList[i]);
            if (token) {
                Cookies.set(serviceList[i], token);
                if (Cookies.get(serviceList[i]))
                    registerService(serviceList[i]);
            }
        }
        window.history.replaceState(null, '', window.location.pathname);
    }, []);

    const handleClick = (service, origin) => {
        window.location.href = 'http://localhost:8080/' + service + '/login/';
    };

    return (
        <div className="service">
            <div className="all-container">
                <Title title="Service Connection" />
                <div className="container">
                    <div className="back-rectangle">
                        <div className="column-container">
                            <RectangleService
                                text="<b>Connect to<br />discord<b\>"
                                logo={logo_discord}
                                Click={() =>
                                    handleClick(
                                        'discord',
                                        'http://localhost:8081'
                                    )
                                }
                            />
                            <RectangleService
                                text="<b>Connect to<br />Google<b\>"
                                logo={logo_google}
                                Click={() =>
                                    handleClick(
                                        'google',
                                        'http://localhost:8081'
                                    )
                                }
                            />
                        </div>
                        <div className="column-container">
                            <RectangleService
                                text="<b>Connect to<br />Twitter (X)<b\>"
                                logo={logo_X}
                                Click={() =>
                                    handleClick(
                                        'twitter',
                                        'http://localhost:8081'
                                    )
                                }
                            />
                            <RectangleService
                                text="<b>Connect to<br />Spotify<b\>"
                                logo={logo_spotify}
                                Click={() =>
                                    handleClick(
                                        'spotify',
                                        'http://localhost:8081'
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
