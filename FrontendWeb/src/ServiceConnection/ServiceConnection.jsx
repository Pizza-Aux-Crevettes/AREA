import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../Title'
import logo_discord from '../assets/discord.png'
import logo_X from '../assets/X.png'
import logo_spotify from '../assets/spotify.png'
import logo_google from '../assets/google.png'
import './ServiceConnection.css'

function RectangleService({ text, logo, Click }) {
  return (
    <div className='rectangle'>
      <button onClick={Click}>
        <h3 dangerouslySetInnerHTML={{ __html: text }} />
      </button>
      <img src={logo} className="logo-rect" />
    </div>
  );
}

function Service() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const search = window.location.search;
    let token = window.localStorage.getItem("access_token=");

    if (!token && search) {
      const params = new URLSearchParams(search);
      token = params.get('access_token');
      if (token) {
        setToken(token);
      }
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  const fetchSpotifyData = async () => {
    if (token) {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Spotify Data:', data);
      } catch (error) {
        console.error("Error fetching Spotify data", error);
      }
    }
  };

  return (
    <div className='service'>
      <div className='all-container'>
        <Title title="Service Connection" />
        <div className='container'>
          <div className='back-rectangle'>
            <div className='column-container'>
              <RectangleService text="<b>Connect to<br />discord<b\>" logo={logo_discord} Click={null}/>
              <RectangleService text="<b>Connect to<br />Google<b\>" logo={logo_google} Click={null}/>
            </div>
            <div className='column-container'>
              <RectangleService text="<b>Connect to<br />Twitter (X)<b\>" logo={logo_X} Click={null}/>
              <RectangleService text="<b>Connect to<br />Spotify<b\>" logo={logo_spotify} Click={!token ? handleLogin : fetchSpotifyData}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service;
