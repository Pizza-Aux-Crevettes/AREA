require("dotenv").config();
import { Express } from "express";
import { newsApi } from "./API/News";

const app: Express = require("express")();
const port = 3000;
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

require("./routes/users/users")(app);
require("./API/Spotify")(app);
require("./API/openWeather/openWeather")(app);
//newsApi();
app.listen(port, () => {});
