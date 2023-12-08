import {DataTypes} from 'sequelize';
import sequelize from '../sequelize.js';

const Music = sequelize.define(
  'Music',
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
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    trackNumber: DataTypes.INTEGER,
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // coverImagePath: DataTypes.STRING,
    duration: DataTypes.INTEGER, // en secondes
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
    tableName: 'musics',
    timestamps: true,
  },
);

export default Music;
