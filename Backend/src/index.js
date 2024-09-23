"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const app = require("express")();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization,X-Group-Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
app.listen(port, () => { });
