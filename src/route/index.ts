import express from 'express';
import { authRoute } from './auth-route';

const router  = express();
router .use(`/auth`, authRoute);

export {router as Routes}