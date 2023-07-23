export interface IModalHashathon {
  hashId: number;
  name: string;
  startDate: string;
  endDate: string;
  hostedBy: string;
  allowedSlots: number;
  remainingSlots: number;
  isOpenForRegistration: boolean;
}

export interface IModalEmployee {
  uId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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