import express, {Express} from 'express';
import "reflect-metadata";
import {Connection, createConnection} from "typeorm";
import {json, urlencoded} from "body-parser";
import cookieParser from "cookie-parser";
import {ORMConfig} from './config/typeorm'
import { DataSource } from 'typeorm';
import {Request, Response} from "express";
import router from './routes/routes';
import { cookie } from 'express-validator';
import * as dotenv from 'dotenv';
import { validation } from './config';
const cors = require('cors');

// import { registerUser } from './src/routes/users/registerUser';
// import { loginUser } from './src/routes/users/loginUser';
// import { logoutUser } from './src/routes/users/logoutUser';
// import { getAllUsers } from './src/routes/users/getAllUsers';
// import { getUser } from './src/routes/users/getUser';
// import { getTokens } from './src/routes/token/getTokens';
// import { refreshToken } from './src/routes/token/refresh';

dotenv.config()

const getDBConnection = async () => {
    const app: Express = express();
    const PORT = process.env.PORT || 8000;
    console.log(validation(process.env))

    try{
        
        app.use(express.urlencoded({ extended: false}));
        app.use(json());
        app.use(cookieParser())
        app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
          }));
                   
        app.use(router)
        // app.use(registerUser);
        // app.use(getAllUsers);
        // app.use(loginUser);
        // app.use(logoutUser);
        // app.use(getTokens);
        // app.use(refreshToken);
        // app.use(getUser);

    app.listen(PORT)
    console.log(`Server is running at http://localhost:${PORT}`)
    } catch (err : any) {
        (err.message)
    }

}

export let dbConnection : Connection;
export let dbManager;

(async () => {
    await getDBConnection();
    dbConnection = await createConnection(ORMConfig)
    dbManager = dbConnection.manager;
})()
