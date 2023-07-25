import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { HttpError } from '../helper/helper';
import db from '../models';
import { HashathonOutput } from '../models/Hashathon';
import {
  IModalEmployee,
  IModalHashathon,
  IPaginateReturnValue,
  StatusCodes,
} from '../types';
import { paginate } from '../utility/utility';
import { findAllEmployee, findOneEmployee } from './employee';

export const updateHashthon = async (
  name: string,
  hashId: number,
  value: any
): Promise<HashathonOutput> => {
  let hashthon = await db.Hashathon.update(
    { [name]: value },
    { where: { hash_id: hashId }, raw: true }
  );
  return hashthon;
};

export const cancelHashthon = async (id: number): Promise<any> => {
  try {
    const rowsDeleted = await db.Hashathon.destroy({
      where: { hash_id: id },
      raw: true,
    });
    return rowsDeleted;
  } catch (e) {
    throw new HttpError('Something went wrong', StatusCodes.SERVER_ERROR);
  }
};

export const listHashathons = async (req: Request, res: Response) => {
  try {
    // get the query params
    const { search, page, limit, order_by, order_direction } = req.query;

    let searchQuery;
    let order = [];

    // add the search term to the search object
    if (searchQuery) {
      searchQuery = {
        where: {
          name: {
            [Op.iLike]: `%${searchQuery}%`,
          },
        },
      };
    }

    // add the order parameters to the order
    if (order_by && order_direction) {
      order.push([order_by, order_direction]);
    }

    // paginate method that takes in the model, page, limit, search object, order and transform
    const hashathons: IPaginateReturnValue = await paginate(
      db.Hashathon,
      Number(page),
      Number(limit),
      search,
      order
    );

    if (hashathons.data.length === 0) {
      throw new HttpError('Product not found', 404);
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched Hashsthons',
      data: hashathons,
    });
  } catch (error: any) {
    return res.status(error.statusCode).send({
      success: false,
      message: error.message,
    });
  }
};

export const findOneHashthpn = async (
  hashthonId: number
): Promise<IModalHashathon> => {
  try {
    return await db.Hashathon.findOne({ where: { hashId: hashthonId } });
  } catch (e) {
    throw new HttpError('Something went Wrong!!', StatusCodes.SERVER_ERROR);
  }
};

export const listParticipantsOfHashthon = async (
  hashthonId: number
): Promise<IModalEmployee[]> => {
  try {
    const list = await findOneHashthpn(hashthonId);
    return await findAllEmployee(list.participants);
  } catch (e) {
    throw new HttpError('Something went Wrong!!', StatusCodes.SERVER_ERROR);
  }
};
