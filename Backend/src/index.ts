require('dotenv').config();
import { Express } from 'express';
import { newsApi } from './API/News';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app: Express = require('express')();
const port = 8080;
const bodyParser = require('body-parser');
const doc = require('../output.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
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
require('./API/Spotify')(app);
require('./API/google/Google')(app);
require('./API/X/X')(app);
require('./API/Discord')(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(doc));

//newsApi();

app.listen(port, '0.0.0.0', () => {});
