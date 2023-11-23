import {DataTypes} from 'sequelize';
import sequelize from '../sequelize.js';

const Album = sequelize.define(
  'Album',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artists',
        key: 'id',
      },
    },
  },
  {},
);

export default Album;
