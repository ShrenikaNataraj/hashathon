import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import { IGetUserAuthInfoRequest } from '../types';

// Middleware to authenticate JWT token for  APIs
export const authenticateJWT = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { Employee } = db;
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const employeeId = (decoded as { id: number }).id;
    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.employee = employee;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
