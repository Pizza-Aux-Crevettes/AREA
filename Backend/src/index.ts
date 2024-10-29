require('dotenv').config();
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

const app: Express = require('express')();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const doc = require('../output.json');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req , res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type,Authorization,X-Group-Authorization'
    );

    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next();
});

require('./routes/users/users')(app);
require('./routes/services/services')(app);
require('./routes/login/login')(app);
require('./routes/register/register')(app);
require('./routes/area/area')(app);
require('./API/spotify/Spotify')(app);
require('./API/google/Google')(app);
require('./API/twitch/Twitch')(app);
require('./API/discord/Discord')(app);
require('./API/github/Github')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));
app.use('/output', express.static('/output'));
app.listen(port, () => {});
