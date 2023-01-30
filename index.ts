import express, {Express} from 'express';
import "reflect-metadata";
import dotenv from 'dotenv'
import {Connection, createConnection} from "typeorm";
import {json, urlencoded} from "body-parser";
import { registerUser } from './src/routes/users/registerUser';
import { loginUser } from './src/routes/users/loginUser';
import { logoutUser } from './src/routes/users/logoutUser';
import { getAllUsers } from './src/routes/users/getAllUsers';
import { getUser } from './src/routes/users/getUser';
import { getTokens } from './src/routes/token/getTokens';
import { refreshToken } from './src/routes/token/refresh';
import ORMConfig from './ormconfig'
import { DataSource } from 'typeorm';
import {Request, Response} from "express";
const cors = require('cors');

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests

const getDBConnection = async () => {
    let dbConnection: Connection

    try{
        console.log(ORMConfig);
        dbConnection = await createConnection(ORMConfig)
        app.use(cors({
            allowedHeaders: ['localhost:8000']
        }));
        app.use(registerUser);
        app.use(getAllUsers);
        app.use(loginUser);
        app.use(logoutUser);
        app.use(getTokens);
        app.use(refreshToken);
        app.use(getUser);
        app.use(express.urlencoded({ extended: false}));
        app.use(json());

    app.listen(PORT)
    console.log(`Server is running at http://localhost:${PORT}`)
    } catch (err : any) {
        (err.message)
    }
    return dbConnection!;

    // register all application routes
    // AppRoutes.forEach(route => {
    //     app[route.method](route.path, (request: Request, response: Response, next: Function) => {
    //         route.action(request, response)
    //             .then(() => next)
    //             .catch(err => next(err));
    //     });
    // });

}

export let dbConnection : Connection;
export let dbManager;

(async () => {
    dbConnection = await getDBConnection();
    dbManager = dbConnection.manager;
})()

const app: Express = express();
const PORT = process.env.PORT || 8000;