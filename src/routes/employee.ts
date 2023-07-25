import { Router } from 'express';
import { updateEmployeeDetails } from '../controllers/employee';

const authRouter = Router();

authRouter.put('/update', updateEmployeeDetails);

export default authRouter;
