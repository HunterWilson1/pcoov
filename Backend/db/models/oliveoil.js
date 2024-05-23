const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const OliveOil = sequelize.define('OliveOil', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pairings: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = OliveOil;
