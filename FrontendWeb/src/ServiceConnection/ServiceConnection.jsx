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
  
  const handleClick = (service) => {
    window.location.href = "http://localhost:3000/" + service + "/login";
  }

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