'use strict';
import { Model, Optional } from 'sequelize';
import { IModalHashathon as HashathonModelAttributes } from '../types';

export interface HashathonInput
  extends Optional<HashathonModelAttributes, 'hashId'> {}

export interface HashathonOutput extends Required<HashathonModelAttributes> {}

module.exports = (sequelize: any, DataTypes: any) => {
  class Hashathon
    extends Model<HashathonModelAttributes, HashathonInput>
    implements HashathonModelAttributes
  {
    name!: string;
    hashId!: number;
    startDate!: Date;
    endDate!: Date;
    hostedBy!: string;
    slots!: number;
    participants!: number[];
    minRequirement!: [string, number];
    regStartDate!: Date;
    regEndDate!: Date;

    public isOpenForRegistration(): boolean {
      const currentDate = new Date();
      return (
        currentDate >= this.regStartDate &&
        currentDate <= this.regEndDate &&
        this.participants.length < this.slots
      );
    }
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
      slots: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      regEndDate: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'reg_end_date',
      },
      regStartDate: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'reg_start_date',
      },
      hostedBy: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'hosted_by',
      },
      participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      minRequirement: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'min_requirements',
      },
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
