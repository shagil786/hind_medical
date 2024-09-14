import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import {authJwt} from './helpers/jwt';
import {errorHandler} from './helpers/error-handler'
import {url} from './config/database.config';
import mongoose from 'mongoose';
import { Routes } from './route';

const app = express();
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(morgan('tiny'));
app.use(errorHandler);

app.use(`/${api}`, Routes);

mongoose.connect(url!, {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    }
}).then(() => {
    console.log('Successfully connected to the database!');
}).catch((err) => {
    console.log('Could not connect to the database, Exiting now...', err);
    process.exit();
});

export {app};
