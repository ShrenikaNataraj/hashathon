import express from 'express';
import authRouter from './authRoutes';
import hashathonRouter from './hashathon';
import employeeRouter from './employee';

export const routes = express.Router();

routes.use('/auth', authRouter);
routes.use('/hashathon', hashathonRouter);
routes.use('/employee', employeeRouter);

export default routes;
