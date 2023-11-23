import {DataTypes} from 'sequelize';
import sequelize from '../sequelize.js';

const Artist = sequelize.define(
  'Artist',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {},
);

export default Artist;
