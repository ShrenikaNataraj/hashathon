'use strict';
import { Model, Optional } from 'sequelize';
import { IModalHashathon as HashathonModelAttributes } from '../types';

export interface CategoryInput extends Optional<HashathonModelAttributes, 'hashId'> {}

export interface CategoryOutput extends Required<HashathonModelAttributes> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class Hashathon
    extends Model<HashathonModelAttributes, CategoryInput>
    implements HashathonModelAttributes
  {
    name!: string;
    hashId!: number;
    startDate!: string;
    endDate!: string;
    hostedBy!: string;
    allowedSlots!: number;
    remainingSlots!: number;
    isOpenForRegistration!: boolean;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this   method automatically.
     */
    
    static associate() {
      // define association here
    }
  }
  Hashathon.init(
    {
      hashId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: 'hash_id',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      allowedSlots: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      remainingSlots: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      hostedBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isOpenForRegistration: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      }
    },
    {
      sequelize,
      underscored: true,
      timestamps: false,
      modelName: 'Hashathon',
      tableName: 'Hashathon',
      freezeTableName: true,
    }
  );
  return Hashathon;
};
