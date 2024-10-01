import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ConnectionsServices.css"

function ConnectionServiceSpotify() {
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
    // console.log(token);
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
    <div className="App">
      <header className="App-header">
        <h1>Spotify OAuth with React</h1>
        {!token ? (
          <button onClick={handleLogin}>Login with Spotify</button>
        ) : (
          <>
            <h2>You're logged in!</h2>
            <button onClick={fetchSpotifyData}>Fetch Spotify Data</button>
          </>
        )}
      </header>
    </div>
  );
}

export default ConnectionServiceSpotify;
