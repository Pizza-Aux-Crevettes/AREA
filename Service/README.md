# Service Project

## Description

The "Service" part of the project is independent from the rest. 
It allows the area logic to function for all users, even if the backend or the visual interface is not running.
---

## Table of Contents

-   [Installation](#installation)
-   [Starting the Project](#starting-the-project)
-   [Environment Variables](#environment-variables)

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

---

## Environnement variables

The project requires certain environment variables to function correctly.

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

   TWITCH_CLIENT_ID="your-twitch-client-id"
   TWITCH_CLIENT_SECRET="your-twitch-client-secret"
   
   SECRET="your-application-secret"
   ```
