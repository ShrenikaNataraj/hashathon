import { Request, Response } from 'express';
import { HttpError, validateHashthon } from '../helper/helper';
import db from '../models/index';
import { updateEmployee } from '../service/employee';
import {
  cancelHashthon,
  listHashathons,
  listParticipantsOfHashthon,
  updateHashthon,
} from '../service/hashathon';
import { IGetUserAuthInfoRequest, StatusCodes } from '../types';

export const registerForHackathon = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const { Hashathon } = db;
  try {
    const { hackathonId } = req.body;
    const { employee } = req;

    // Check if the hackathon exists
    const hackathon = await Hashathon.findOne({
      where: { hashId: hackathonId },
    });
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    // Check if the hackathon registration is open
    if (!hackathon.isOpenForRegistration) {
      return res
        .status(400)
        .json({ message: 'Hackathon registration is closed' });
    }
    // Check if the hackathon slot is full
    if (
      hackathon.dataValues.slots <= hackathon.dataValues.participants.length
    ) {
      return res.status(400).json({ message: 'Hackathon slots are full' });
    }

    // Register the employee for the hackathon
    const { minRequirement } = hackathon!.dataValues;
    if (
      !(
        employee!.dataValues.experience >= Number(minRequirement[1]) ||
        employee!.dataValues.techStack === minRequirement[0]
      )
    ) {
      throw new HttpError(
        'Sorry your Requirements does not match',
        StatusCodes.USER_ERROR
      );
    }
    let hashthons = employee!.dataValues.hackathonParticipations;
    hashthons.push(hackathonId);
    // Add the employee to the hackathon participants list
    await updateEmployee(
      'hackathonRegistrations',
      employee!.dataValues.uId,
      hashthons
    );
    let participants = hackathon.dataValues.participants;
    participants.push(employee!.dataValues.uId);
    console.log(participants);
    await updateHashthon('participants', hackathonId, participants);

    return res
      .status(200)
      .json({ message: 'Registered for hackathon successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createHashathon = async (
  req: IGetUserAuthInfoRequest,
  res: Response
) => {
  const {
    name,
    startDate,
    endDate,
    slots,
    minRequirement,
    hostedBy,
    regStartDate,
    regEndDate,
  } = req.body;
  if (validateHashthon(req.body)) {
    db.Hashathon.create({
      name,
      startDate,
      endDate,
      slots,
      minRequirement,
      hostedBy,
      regStartDate,
      regEndDate,
    })
      .then(() => {
        return res
          .status(200)
          .json({ message: 'Registered for hackathon successfully' });
      })
      .catch(() => {
        return res.status(500).json({ message: 'Internal server error' });
      });
  } else {
    return res
      .status(StatusCodes.USER_ERROR)
      .json({ message: 'Please enter correct fields' });
  }
};

export const getHashthons = async (req: Request, res: Response) => {
  await listHashathons(req, res);
};

export const voidHashathon = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await cancelHashthon(Number(id));
    return res.status(200).send({
      success: true,
    });
  } catch (e) {
    return res
      .status(StatusCodes.USER_ERROR)
      .json({ message: 'Please enter correct fields' });
  }
};

export const listAllHashthonParticipants = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    let data = await listParticipantsOfHashthon(Number(id));
    return res.status(200).send({
      data,
    });
  } catch (e) {
    return res
      .status(StatusCodes.USER_ERROR)
      .json({ message: 'Please enter correct fields' });
  }
};
