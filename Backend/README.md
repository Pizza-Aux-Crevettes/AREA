# Backend Project

## Description

This project manages users, makes calls to third-party APIs such as Google, Spotify, OpenWeather, and NewsAPI, and serves data to the frontend. Authentication is handled via JSON Web Tokens (JWT) and Supabase. Swagger is used for API documentation.

---

## Table of Contents

-   [Installation](#installation)
-   [Starting the Project](#starting-the-project)
-   [Environment Variables](#environment-variables)
-   [API Documentation](#api-documentation)
-   [Project Structure](#project-structure)
-   [Dependencies](#dependencies)
-   [Useful Commands](#useful-commands)

---

## Installation

To install and run the backend locally:

1. Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd backend-project
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

---

## Starting the project

To start the project, use the following command:
`bash
    npm run dev
    `

The server will run by default on port 3000.

---

## Environnement variables

The project requires certain environment variables to function correctly. Create a .env file at the root of the project with the following content:
`bash
    REACT_APP_SUPABASE_URL="https://qkqqhtvrxplbxmvikcdy.supabase.co"
    REACT_APP_SUPABASE_ANON_KEY="your-supabase-anon-key"
    GOOGLE_API_KEY="your-google-api-key"
    NEWSAPI_API_KEY="your-newsapi-api-key"
    OPENWEATHER_KEY="your-openweather-api-key"
    SPOTIFY_CLIENT_ID="your-spotify-client-id"
    SPOTIFY_CLIENT_SECRET="your-spotify-client-secret"
    SECRET=AREA
    `

---

## API Documentation

The complete API documentation can be accessed via Swagger. Once the server is running, navigate to http://localhost:3000/api-docs to explore the available endpoints and their usage.

---

## Project structure

Here is the structure of the project:

`bash
    src
    ├── API
    │   ├── News.ts
    │   ├── Spotify.ts
    │   ├── google
    │   │   ├── Google.ts
    │   │   └── googleTranslate.ts
    │   └── openWeather
    │       ├── openWeather.query.ts
    │       └── openWeather.ts
    ├── config
    │   └── db.ts
    ├── index.ts
    └── routes
        ├── services
        │   ├── services.query.ts
        │   └── services.ts
        └── users
            ├── users.query.ts
            └── users.ts
    `

---

## Dependencies

The following dependencies are required for the project:

**Dev Dependencies:**

-   @supabase/supabase-js: ^2.45.4
-   @types/bcryptjs: ^2.4.6
-   @types/body-parser: ^1.19.5
-   @types/dotenv: ^8.2.0
-   @types/express: ^4.17.21
-   @types/jsonwebtoken: ^9.0.6
-   @types/node: ^22.5.2
-   @types/swagger-jsdoc: ^6.0.4
-   bcryptjs: ^2.4.3
-   express: ^4.19.2
-   jsonwebtoken: ^9.0.2
-   tslint: ^6.1.3
-   typescript: ^5.5.4

**Dependencies:**

-   axios: ^1.7.7

## Useful Commands

Build the project: `npm run build`
Start the server: `npm run start`
Run the project in development mode: `npm run dev`
Lint the code: `npm run lint`
Generate Swagger Documentation: Swagger documentation will be updated automatically if you follow the right format in your route comments.
