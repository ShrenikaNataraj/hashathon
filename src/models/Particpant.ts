'use strict';
import { Model, Optional } from 'sequelize';
import { IModalParticipant as ParticipantAttributes } from '../types';

export interface ParticipantInput
  extends Optional<ParticipantAttributes, 'pId'> {}

export interface EmployeeOutput extends ParticipantAttributes {}

module.exports = (sequelize: any, DataTypes: any) => {
  class Participant
    extends Model<ParticipantInput, ParticipantAttributes>
    implements ParticipantAttributes
  {
    pId!: number;
    hashId!: number;
    eId!: number;
    experience!: number;
    techStack!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     *
     */

     static associate() {
      // define association here
    }
  }
  Participant.init(
    {
      pId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'p_id',
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      techStack: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hashId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'hash_id',

      },
      eId: {
        type: DataTypes.INTEGER, allowNull: false,
        field: 'e_id',
    },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Participant',
      tableName: 'Participant',
      freezeTableName: true,
    }
  );
  return Participant;
};
