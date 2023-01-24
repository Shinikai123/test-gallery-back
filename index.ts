import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as bodyParser from "body-parser";
import {AppRoutes} from "./src/routes";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    // create express app
    const express = require("express")
    const app = express();
    app.use(bodyParser.json());
    const PORT = process.env.PORT;

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(8000);

    console.log(`Express application is up and running on port ${PORT}`);

}).catch(error => console.log("TypeORM connection error: ", error));
