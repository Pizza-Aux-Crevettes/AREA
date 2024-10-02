import React, { useEffect, useState } from "react";
import Cookies from "cookies-js";
import Title from "../Title";
import logo_discord from "../assets/discord.png";
import logo_X from "../assets/X.png";
import logo_spotify from "../assets/spotify.png";
import logo_google from "../assets/google.png";
import "./ServiceConnection.css";

function RectangleService({ text, logo, Click }) {
    return (
        <div className="rectangle">
            <button onClick={Click}>
                <h3 dangerouslySetInnerHTML={{ __html: text }} />
            </button>
            <img src={logo} className="logo-rect" />
        </div>
    );
}

function Service() {
    useEffect(() => {
        const search = window.location.search;
        let Token = window.localStorage.getItem("access_token=");

        if (!Token && search) {
            const params = new URLSearchParams(search);
            Token = params.get("access_token");
            if (Token) {
                Cookies.set("spotify_token", Token);
            }
            window.history.replaceState(null, "", window.location.pathname);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = "http://localhost:3000/spotify/login";
    };

    const playPreview = async (accessToken) => {
        const response = await fetch(
            `https://api.spotify.com/v1/tracks/1Fid2jjqsHViMX6xNH70hE`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const data = await response.json();
        const previewUrl = data.preview_url;

        if (previewUrl) {
            const audio = new Audio(previewUrl);
            audio.play();
        } else {
            console.log("Pas de prévisualisation disponible pour ce morceau.");
        }
    };

    // const fetchSpotifyData = async () => {
    //     playPreview(token);
    // };

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
                                Click={null}
                            />
                            <RectangleService
                                text="<b>Connect to<br />Google<b\>"
                                logo={logo_google}
                                Click={null}
                            />
                        </div>
                        <div className="column-container">
                            <RectangleService
                                text="<b>Connect to<br />Twitter (X)<b\>"
                                logo={logo_X}
                                Click={null}
                            />
                            <RectangleService
                                text="<b>Connect to<br />Spotify<b\>"
                                logo={logo_spotify}
                                Click={handleLogin}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Service;
