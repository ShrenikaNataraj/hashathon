'use strict';
import { Model, Optional } from 'sequelize';
import { IModalEmployee as EmployeeAttributes } from '../types';
import db from '../models/index';
export interface EmployeeInput extends Optional<EmployeeAttributes, 'uId'> {}

export interface EmployeeOutput extends Required<EmployeeAttributes> {}

module.exports = (sequelize: any, DataTypes: any) => {
  const { Hackathon } = db;
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
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public async getParticipatedHackathons() {
      return await Hackathon.findAll({
        where: { id: this.hackathonParticipations },
      });
    }

    static associate() {
      // define association here
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
      },
      hackathonParticipations: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'OrderDetails',
      tableName: 'OrderDetails',
      freezeTableName: true,
    }
  );
  return Employee;
};
