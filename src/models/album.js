import {DataTypes} from 'sequelize';
import sequelize from '../sequelize.js';

const Album = sequelize.define(
  'Album',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
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
    coverImagePath: DataTypes.STRING,
  },
  {
    tableName: 'albums',
    timestamps: true,
  },
);

export default Album;
