// oliveoil.js
const { DataTypes } = require('sequelize');
const sequelize = require('../connection'); // Assuming this is where your Sequelize connection is setup

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
    type: DataTypes.STRING,
    allowNull: false,
  },

  pairings: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = OliveOil;
