import { Router } from 'express';
import { registerEmployee, loginEmployee } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/register', registerEmployee);
authRouter.post('/login', loginEmployee);

export default authRouter;
