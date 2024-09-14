import express from 'express';
import {UserController} from '../controller/auth';

const authRoute = express.Router()

authRoute.post('/login', UserController.login);
authRoute.post('/register', UserController.signup);

export {authRoute};