"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const bodyParser = __importStar(require("body-parser"));
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const knex = require('knex');
    const express = require("express");
    const cors = require('cors');
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    const PORT = process.env.PORT || 8000;
    const db = knex({
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
    });
    app.get('/users', (req, res) => {
        db.select('*')
            .from('users')
            .then((data) => {
            console.log(data);
            res.json(data);
        })
            .catch((err) => {
            console.log(err);
        });
    });
    app.get('/user/:userID', (req, res) => {
        const userID = req.params.userID;
        db.select('*')
            .from('users')
            .where('id', '=', userID)
            .then((data) => {
            console.log(data);
            res.json(data);
        })
            .catch((err) => {
            console.log(err);
        });
    });
    app.post('/users/registration', (req, res) => {
        const { userID, userName, userEmail, userPassword, signupDate } = req.body;
        db('users')
            .insert({
            id: userID,
            user_name: userName,
            user_email: userEmail,
            password: userPassword,
            signup_date: signupDate,
        })
            .then(() => {
            console.log('user added');
            return res.json({ msg: 'user added' });
        })
            .catch((err) => {
            console.log(err);
        });
    });
    app.delete('/users/delete-user', (req, res) => {
        const userID = req.body;
        const userIDToDelete = Number(userID.userID);
        console.log(userIDToDelete);
        db('users')
            .where('id', '=', userIDToDelete)
            .del()
            .then(() => {
            console.log('user deleted');
            return res.json({ msg: 'user deleted' });
        })
            .catch((err) => {
            console.log(err);
        });
    });
    // DELETE: Delete movie by movieId from the database
    app.put('/users/update-user', (req, res) => {
        db('users')
            .where('user_name', '=', 'Test')
            .update({ movie_name: 'Admin' })
            .then(() => {
            console.log('user updated');
            return res.json({ msg: 'user updated' });
        })
            .catch((err) => {
            console.log(err);
        });
    });
    // register all application routes
    // AppRoutes.forEach(route => {
    //     app[route.method](route.path, (request: Request, response: Response, next: Function) => {
    //         route.action(request, response)
    //             .then(() => next)
    //             .catch(err => next(err));
    //     });
    // });
    // run app
    app.listen(8000);
    console.log(`Express application is up and running on port ${PORT}`);
})).catch(error => console.log("TypeORM connection error: ", error));
