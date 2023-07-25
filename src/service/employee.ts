import { HttpError } from '../helper/helper';
import db from '../models';
import { EmployeeOutput } from '../models/Employee';
import { IModalEmployee, StatusCodes } from '../types';

export const updateEmployee = async (
  name: string,
  employeeId: number,
  value: any
): Promise<EmployeeOutput> => {
  let employee = await db.Employee.update(
    { [name]: value },
    { where: { u_id: employeeId }, raw: true }
  );
  return employee;
};

export const findOneEmployee = async (
  empId: number
): Promise<IModalEmployee> => {
  console.log(empId);
  try {
    let res = await db.Employee.findOne({
      where: { uId: empId },
      raw: true,
    });
    return res;
  } catch (e) {
    throw new HttpError('Something went Wrong!!', StatusCodes.SERVER_ERROR);
  }
};

export const findAllEmployee = async (
  empId: number[]
): Promise<IModalEmployee[]> => {
  try {
    return await db.Employee.findAll({
      where: { u_id: empId },
      raw: true,
    });
  } catch (e) {
    throw new HttpError('Something went Wrong!!', StatusCodes.SERVER_ERROR);
  }
};
