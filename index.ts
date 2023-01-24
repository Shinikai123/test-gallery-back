import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import express from "express";
import bodyParser from "body-parser";
import {AppRoutes} from "./src/routes";
import {userSaveAction} from "./src/controller/UserSaveAction";
import { userGetAllAction } from "./src/controller/UserGetAllAction";
import { userGetByIdAction } from "./src/controller/UserGetByIdAction";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    app["get"]('/users', userGetAllAction)
    app["get"]('/user/:id', userGetByIdAction)
    app["post"]('/users', userSaveAction)


    // run app
    app.listen(8000);

    console.log("Express application is up and running on port 8000");

}).catch(error => console.log("TypeORM connection error: ", error));
