import React, { useEffect } from 'react';
import Cookies from "cookies-js";
import Title from '../Title/Title'
import logo_discord from '../assets/discord.png'
import logo_X from '../assets/X.png'
import logo_spotify from '../assets/spotify.png'
import logo_google from '../assets/google.png'
import './ServiceConnection.css'

function RectangleService({ text, logo, Click }) {
  return (
    <div className='rectangle'>
      <button onClick={Click} className='button-style'>
        <h3 dangerouslySetInnerHTML={{ __html: text }} />
      </button>
      <img src={logo} className="logo-rect" />
    </div>
  );
}

function Service() {
  useEffect(() => {
    const search = window.location.search;
    let token_spo = window.localStorage.getItem("spotify_token=");
    let token_x = window.localStorage.getItem("x_token=");
    let token_goo = window.localStorage.getItem("google_token=");
    let token_dis = window.localStorage.getItem("discord_token=");

    if (!token_spo && search) {
      const params = new URLSearchParams(search);
      token_spo = params.get("access_token");
      if (token_spo) {
        Cookies.set("spotify_token", token_spo);
      }
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (!token_x && search) {
      const params = new URLSearchParams(search);
      token_x = params.get("access_token");
      if (token_x) {
        Cookies.set("x_token", token_x);
      }
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (!token_goo && search) {
      const params = new URLSearchParams(search);
      token_goo = params.get("access_token");
      if (token_goo) {
        Cookies.set("google_token", token_goo);
      }
      window.history.replaceState(null, "", window.location.pathname);
    }
    if (!token_dis && search) {
      const params = new URLSearchParams(search);
      token_dis = params.get("access_token");
      if (token_dis) {
        Cookies.set("discord_token", token_dis);
      }
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const handleClick = (service) => {
    window.location.href = "http://localhost:3000/" + service + "/login";
  }

  // const playPreview = async (accessToken) => {
  //     const response = await fetch(
  //         `https://api.spotify.com/v1/tracks/1Fid2jjqsHViMX6xNH70hE`,
  //         {
  //             headers: {
  //                 Authorization: `Bearer ${accessToken}`,
  //             },
  //         }
  //     );
  //     const data = await response.json();
  //     const previewUrl = data.preview_url;

  //     if (previewUrl) {
  //         const audio = new Audio(previewUrl);
  //         audio.play();
  //     } else {
  //         console.log("Pas de prévisualisation disponible pour ce morceau.");
  //     }
  // };

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
                Click={() => handleClick("discord")}
              />
              <RectangleService
                text="<b>Connect to<br />Google<b\>"
                logo={logo_google}
                Click={() => handleClick("google")}
              />
            </div>
            <div className="column-container">
              <RectangleService
                text="<b>Connect to<br />Twitter (X)<b\>"
                logo={logo_X}
                Click={() => handleClick("twitter")}
              />
              <RectangleService
                text="<b>Connect to<br />Spotify<b\>"
                logo={logo_spotify}
                Click={() => handleClick("spotify")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;