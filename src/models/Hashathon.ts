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
    allowedSlots!: number;
    remainingSlots!: number;
    participants!: number[];
    // ... other fields ...

    public isOpenForRegistration(): boolean {
      const currentDate = new Date();
      return (
        currentDate >= this.startDate &&
        currentDate <= this.endDate &&
        this.participants.length < this.allowedSlots
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
      participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
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
