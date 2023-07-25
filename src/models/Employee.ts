'use strict';
import { Model, Optional } from 'sequelize';
import { IModalEmployee as EmployeeAttributes } from '../types';
import db from './index';
export interface EmployeeInput extends Optional<EmployeeAttributes, 'uId'> {}

export interface EmployeeOutput extends Required<EmployeeAttributes> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class Employee
    extends Model<EmployeeAttributes, EmployeeInput>
    implements EmployeeAttributes
  {
    uId!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    hackathonRegistrations!: number[]; // Array of Hackathon IDs the employee registered for
    hackathonParticipations!: number[];
    experience!: number;
    techStack!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public async getParticipatedHackathons() {
      return await db.Hashathon.findAll({
        where: { hashId: this.hackathonParticipations },
      });
    }
  }
  Employee.init(
    {
      uId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'u_id',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hackathonRegistrations: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
        field: ' hackathon_registrations',
      },
      hackathonParticipations: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
        field: 'hackathon_participations',
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      techStack: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'Employee',
      tableName: 'Employee',
      freezeTableName: true,
    }
  );
  return Employee;
};
