# Service Project

## Description

This project manages users, makes calls to third-party APIs such as Google, Spotify, OpenWeather, and NewsAPI, and serves data to the frontend. Authentication is handled via JSON Web Tokens (JWT) and Supabase. Swagger is used for API documentation.

---

## Table of Contents

-   [Installation](#installation)
-   [Starting the Project](#starting-the-project)
-   [Environment Variables](#environment-variables)
-   [API Documentation](#api-documentation)
-   [Project Structure](#project-structure)
-   [Useful Commands](#useful-commands)

---

## Installation

To install and run the service locally:

1. Clone the repository:

    ```bash
    git clone git@github.com:EpitechPromo2027/B-DEV-500-TLS-5-1-area-anastasia.bouby.git
    cd B-DEV-500-TLS-5-1-area-anastasia.bouby/Service
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

The project requires certain environment variables to function correctly.

1. Create a .env file at the root of the project with the following content:

    ```bash
    REACT_APP_SUPABASE_URL="https://qkqqhtvrxplbxmvikcdy.supabase.co"
    REACT_APP_SUPABASE_ANON_KEY="your-supabase-anon-key"

    GOOGLE_API_KEY="your-google-api-key"

    NEWSAPI_API_KEY="your-newsapi-api-key"

    OPENWEATHER_KEY="your-openweather-api-key"

    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"

    SPOTIFY_CLIENT_ID="your-spotify-client-id"
    SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"

    DISCORD_CLIENT_ID="your-discord-client-id"
    DISCORD_CLIENT_SECRET="your-discord-client-secret"
    DISCORD_TOKEN="your-discord-token"
    GUILD_ID="1288150792301183007"

    TWITCH_CLIENT_ID="your-twitch-client-id"
    TWITCH_CLIENT_SECRET="your-twitch-client-secret"

    GITHUB_CLIENT_ID="your-github-client-id"
    GITHUB_CLIENT_SECRET="your-github-client-secret"

    SECRET=AREA
    ```

---

## API Documentation

The complete API documentation can be accessed via Swagger. Once the server is running, navigate to http://localhost:8080/api-docs to explore the available endpoints and their usage.

---

## Project structure

Here is the structure of the project:

    src
    ├── API
    │   ├── Discord
    │   │   ├── discord.query.ts
    │   │   └── discord.ts
    │   ├── Github
    │   │   ├── github.query.ts
    │   │   └── github.ts
    │   ├── gmail
    │   │   ├── Gmail.query.ts
    │   │   └── Gmail.ts
    │   ├── news
    │   │   ├── News.query.ts
    │   │   └── News.ts
    │   ├── openWeather
    │   │   ├── openWeather.query.ts
    │   │   └── openWeather.ts
    │   ├── spotify
    │   │   ├── spotify.query.ts
    │   │   └── spotify.ts
    │   └── twitch
    │       ├── twitch.query.ts
    │       └── twitch.ts
    ├── area
    │   ├── area.service.ts
    │   ├── service.action.ts
    │   └── service.reaction.ts
    ├── config
    │   └── db.ts
    ├── DB
    │   ├── area
    │   │   ├── area.query.ts
    │   │   └── area.ts
    │   └── tokens
    │       ├── token.query.ts
    │       └── token.ts
    ├── index.ts
    └── manageFS
        └── manageFile.ts

---

## Useful Commands

-   Run the project in development mode: `npm run dev`