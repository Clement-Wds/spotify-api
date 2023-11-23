import {DataTypes} from 'sequelize';
import sequelize from '../sequelize.js';

const Music = sequelize.define(
  'Music',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artists', // 'artists' refers to table name
        key: 'id', // 'id' refers to column name in artists table
      },
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'albums',
        key: 'id',
      },
    },
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    trackNumber: DataTypes.INTEGER,
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImagePath: DataTypes.STRING,
    duration: DataTypes.INTEGER, // en secondes
  },
  {},
);

export default Music;
