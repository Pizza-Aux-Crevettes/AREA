import bodyParser from "body-parser";

require("dotenv").config();
import { Express } from "express";

export default function createTestServer() {
    const app: Express = require("express")();
    const bodyParser = require("body-parser");

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With,content-type,Authorization,X-Group-Authorization"
        );

        res.setHeader("Access-Control-Allow-Credentials", "true");

        next();
    });

    require("../routes/users/users")(app);
    require("../routes/services/services")(app);
    require("../routes/login/login")(app);
    require("../routes/register/register")(app);

    require("../API/Spotify")(app);
    require("../API/google/Google")(app);
    require("../API/openWeather/openWeather")(app);
    return app;
}
