'use strict';
import { Model, Optional } from 'sequelize';
import { IModalEmployee as EmployeeAttributes } from '../types';

export interface EmployeeInput
  extends Optional<EmployeeAttributes, 'uId'> {}

export interface EmployeeOutput extends Required<EmployeeAttributes> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class EmployeeDetails
    extends Model<EmployeeAttributes,EmployeeInput >
    implements EmployeeAttributes
  {
    uId!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    

    static associate() {
      // define association here
    }
  }
  EmployeeDetails.init(
    {
      uId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field:'u_id'
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
      firstName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      underscored: true,
      modelName: 'OrderDetails',
      tableName: 'OrderDetails',
      freezeTableName: true,
    }
  );
  return EmployeeDetails;
};
