import {DataTypes} from 'sequelize';
import sequelize from '../sequelize.js';

const Playlist = sequelize.define(
  'Playlist',
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
    tableName: 'playlists',
    timestamps: true,
  },
);

export default Playlist;
