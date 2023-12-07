import {DataTypes} from 'sequelize';
import sequelize from '../sequelize.js';

const Artist = sequelize.define(
  'Artist',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'artists',
    timestamps: true,
  },
);

export default Artist;
