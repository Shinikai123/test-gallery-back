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
    const knex = require('knex');
    const express = require("express")
    const cors = require('cors');
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());
    const PORT = process.env.PORT || 8000;

    const db = knex({
        client: 'pg',
        connection: {
            host : process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }, 
    });

    app.get('/users', (req, res) =>{
        db.select('*')
        .from('users')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) =>{
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

    app.post('/users/registration', (req, res) =>{
        const {userID, userName, userEmail, userPassword, signupDate} = req.body;
        db('users')
        .insert({
            id :userID,
            user_name: userName,
            user_email: userEmail,
            password: userPassword,
            signup_date : signupDate,
        })
        .then(() => {
            console.log('user added');
            return res.json({msg: 'user added'});
        })
        .catch((err) => {
            console.log(err);
        })
    })

app.delete('/users/delete-user', (req,res) =>{
    const userID = req.body;
    const userIDToDelete = Number(userID.userID);
    console.log(userIDToDelete);
    db('users')
    .where('id', '=', userIDToDelete)
    .del()
    .then(() => {
        console.log('user deleted');
        return res.json({ msg: 'user deleted'});
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

}).catch(error => console.log("TypeORM connection error: ", error));
