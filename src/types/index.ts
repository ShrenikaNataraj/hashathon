import { Request } from 'express';

export interface IModalHashathon {
  hashId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  hostedBy: string;
  slots: number;
  participants: number[];
  regEndDate: Date;
  regStartDate: Date;
  minRequirement: [string, number];
}

export interface IModalEmployee {
  uId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hackathonRegistrations: number[];
  hackathonParticipations: number[];
  techStack: string;
  experience: number;
}

export interface IModalParticipant {
  pId: number;
  hashId: number;
  eId: number;
  experience: number;
  techStack: string;
}

export enum StatusCodes {
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  USER_ERROR = 400,
}

export interface IGetUserAuthInfoRequest extends Request {
  employee?: Record<string, any>; // or any other type
}

export interface IPaginateReturnValue {
  previousPage: number | null;
  currentPage: number;
  nextPage: number | null;
  total: number;
  limit: number;
  data: IModalHashathon[];
} 