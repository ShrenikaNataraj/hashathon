import { IModalHashathon, StatusCodes } from '../types';

export class HttpError extends Error {
  statusCode: StatusCodes;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const isNumber = (num: any) => {
  return typeof num === 'number';
};

export const isString = (str: any) => {
  return typeof str === 'string';
};

export const validateHashthon = (data: IModalHashathon): boolean => {
  if (
    data.endDate &&
    data.hostedBy &&
    data.minRequirement &&
    isNumber(data.slots) &&
    data.regEndDate &&
    data.regStartDate &&
    data.startDate &&
    data.endDate &&
    data.hostedBy
  ) {
    return true;
  }
  return false;
};
