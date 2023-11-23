const {DataTypes} = require('sequelize');
const sequelize = require('./src/sequelize');

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

module.exports = Artist;
