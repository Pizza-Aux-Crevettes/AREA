import React, { useEffect, useState } from "react";
import Cookies from "cookies-js";
import Title from "../Title/Title";
import logo_discord from "../assets/discord.png";
import logo_X from "../assets/X.png";
import logo_spotify from "../assets/spotify.png";
import logo_google from "../assets/google.png";
import "./ServiceConnection.css";

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

// export const playPreview = async () => {
//     const response = await fetch(
//         `https://api.spotify.com/v1/tracks/1Fid2jjqsHViMX6xNH70hE`,
//         {
//             headers: {
//                 Authorization: `Bearer ${Cookies.get("spotify_token")}`,
//             },
//         }
//     );
//     const data = await response.json();
//     const previewUrl = data.preview_url;

//     if (previewUrl) {
//         const audio = new Audio(previewUrl);
//         audio.play();
//     } else {
//         console.log("No preview available for this song.");
//     }
// };

function Service() {
    useEffect(() => {
        const fetchUserData = async () => {
            const search = window.location.search;
            let Token = window.localStorage.getItem("access_token=");

            if (!Token && search) {
                const params = new URLSearchParams(search);
                Token = params.get("access_token");
                if (Token) {
                    Cookies.set("spotify_token", Token);
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
                            const token_spotify = Cookies.get("spotify_token");
                            const userEmail = json.email;
                            fetch("http://localhost:3000/api/setNewToken", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    userEmail: userEmail,
                                    token_spotify: token_spotify,
                                }),
                            })
                                .then((response) => {
                                    console.log(response.json);
                                })
                                .then(() => {});
                        } else {
                            console.error("userEmail is empty");
                        }
                    } catch (error) {
                        console.error("An error occured", error);
                    }
                }
                window.history.replaceState(null, "", window.location.pathname);
            }
        };
        fetchUserData();
    }, []);

    const handleLogin = () => {
        window.location.href = "http://localhost:3000/spotify/login";
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
