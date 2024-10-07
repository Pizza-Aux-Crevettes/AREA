import React, { useEffect, useState } from 'react';
import Cookies from 'cookies-js';
import Title from '../Title/Title';
import logo_discord from '../assets/discord.png';
import logo_X from '../assets/X.png';
import logo_spotify from '../assets/spotify.png';
import logo_google from '../assets/google.png';
import './ServiceConnection.css';

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
    const response = await fetch(
      "http://localhost:3000/api/user/me",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + Cookies.get("token"),
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const json = await response.json();

        if (json && json.email) {
            const token = Cookies.get(service + '_token');
            const userEmail = json.email;
            fetch('http://localhost:3000/api/setNewToken', {
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
    useEffect(() => {
        const search = window.location.search;
        let token_spo = window.localStorage.getItem('spotify_token=');
        let token_x = window.localStorage.getItem('x_token=');
        let token_goo = window.localStorage.getItem('google_token=');
        let token_dis = window.localStorage.getItem('discord_token=');

        if (!token_spo && search) {
            const params = new URLSearchParams(search);
            token_spo = params.get('spotify_token');
            if (token_spo) {
                Cookies.set('spotify_token', token_spo);
                if (Cookies.get('spotify_token')) registerService('spotify');
            }
            window.history.replaceState(null, '', window.location.pathname);
        }
        if (!token_x && search) {
            const params = new URLSearchParams(search);
            token_x = params.get('x_token');
            if (token_x) {
                Cookies.set('x_token', token_x);
                if (Cookies.get('x_token')) registerService('x');
            }
            window.history.replaceState(null, '', window.location.pathname);
        }
        if (!token_goo && search) {
            const params = new URLSearchParams(search);
            token_goo = params.get('google_token');
            if (token_goo) {
                Cookies.set('google_token', token_goo);
                if (Cookies.get('google_token')) {
                    registerService('google');
                }
            }
            window.history.replaceState(null, '', window.location.pathname);
        }
        if (!token_dis && search) {
            const params = new URLSearchParams(search);
            token_dis = params.get('discord_token');
            if (token_dis) {
                Cookies.set('discord_token', token_dis);
                if (Cookies.get('discord_token')) registerService('discord');
            }
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    const handleClick = (service) => {
        window.location.href = 'http://localhost:3000/' + service + '/login';
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
                                Click={() => handleClick('discord')}
                            />
                            <RectangleService
                                text="<b>Connect to<br />Google<b\>"
                                logo={logo_google}
                                Click={() => handleClick('google')}
                            />
                        </div>
                        <div className="column-container">
                            <RectangleService
                                text="<b>Connect to<br />Twitter (X)<b\>"
                                logo={logo_X}
                                Click={() => handleClick('twitter')}
                            />
                            <RectangleService
                                text="<b>Connect to<br />Spotify<b\>"
                                logo={logo_spotify}
                                Click={() => handleClick('spotify')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
