# Backend Project

## Description

This project is the Frontend part of the AREA project. It manages users, makes calls to third-party APIs such as Google, Spotify, OpenWeather, Twitch, Github and NewsAPI, and serves data to the frontend. Authentication is handled via JSON Web Tokens (JWT) and Supabase. Swagger is used for API documentation.

---

## Table of Contents

-   [Installation](#installation)
-   [Starting the Project](#starting-the-project)
-   [Environment Variables](#environnement-variables)
-   [API Documentation](#api-documentation)
-   [Swagger Generation](#swagger-generation)

---

## Installation

To install and run the backend locally:

1. Clone the repository:

    ```bash
    git clone git@github.com:EpitechPromo2027/B-DEV-500-TLS-5-1-area-anastasia.bouby.git
    cd B-DEV-500-TLS-5-1-area-anastasia.bouby/Backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

---

## Starting the project

1. To start the project, use the following command:
    ```bash
    npm run dev
    ```

2. The server will run by default on port 8080.

---

## Environnement variables

The project requires certain environnement variables to function correctly.

1. Create a .env file at the root of the project with the following content:

    ```bash
   REACT_APP_SUPABASE_URL="your-supabase-url"
   REACT_APP_SUPABASE_ANON_KEY="your-supabase-anon-key"
   
   GOOGLE_API_KEY="your-google-api-key"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   NEWSAPI_API_KEY="your-newsapi-api-key"
   
   OPENWEATHER_KEY="your-openweather-api-key"
   
   SPOTIFY_CLIENT_ID="your-spotify-client-id"
   SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
   
   X_CLIENT_ID="your-x-client-id"
   X_CLIENT_SECRET="your-x-client-secret"
   
   DISCORD_CLIENT_ID="your-discord-client-id"
   DISCORD_CLIENT_SECRET="your-discord-client-secret"
   DISCORD_TOKEN="your-discord-bot-token"
   GUILD_ID="your-discord-guild-id"
   
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   
   SECRET="your-application-secret"
    ```

---

## API Documentation

The complete API documentation can be accessed via Swagger. Once the server is running, navigate to http://localhost:8080/api-docs to explore the available endpoints and their usage.

---

## Swagger Generation

Swagger documentation will be updated automatically if you follow the right format in your route comments.
