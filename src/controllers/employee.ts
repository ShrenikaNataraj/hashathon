import { Request, Response } from 'express';
import { updateEmployee } from '../service/employee';
import { StatusCodes } from '../types';

export const updateEmployeeDetails = (req: Request, res: Response) => {
  const { field, value, id } = req.body;
  try {
    updateEmployee(field, id, value);
    return res.status(200).send({
      message: 'success',
    });
  } catch (e) {
    return res
      .status(StatusCodes.USER_ERROR)
      .json({ message: 'Please enter correct fields' });
  }
};
