const {DataTypes} = require('sequelize');
const sequelize = require('./src/sequelize');

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
    // Add other fields as needed
  },
  {},
);

module.exports = Album;
