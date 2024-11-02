import swaggerAutogen = require('swagger-autogen');

const swaggerOptions = {
    info: {
        title: 'Swagger Documentation',
        version: '1.0',
    },
    servers: [
        {
            url: 'http://localhost:8080',
        },
    ],
    components: {
        schemas: {
            login: {
                token: 'string',
            },
            getArea: {
                id: 'string',
                userEmail: 'string',
                action: 'string',
                reaction: 'string',
                inputAction: 'string',
                inputReaction: 'string',
            },
            getToken: {
                user_email: 'string',
                spotify_token: 'string',
                google_token: 'string',
                discord_token: 'string',
                twitch_token: 'string',
                github_token: 'string',
                discord_refresh: 'string',
                twitch_refresh: 'string',
                google_refresh: 'string',
                spotify_refresh: 'string',
            },
            userMe: {
                email: 'string',
            },
        },
    },
};

const output = 'output.json';
const endpointFiles = ['src/index.ts'];
swaggerAutogen({ openapi: '3.1.0' })(output, endpointFiles, swaggerOptions);
