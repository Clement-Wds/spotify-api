const {DataTypes} = require('sequelize');
const sequelize = require('./src/sequelize');

const Music = sequelize.define(
  'Music',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: DataTypes.STRING,
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

module.exports = Music;
