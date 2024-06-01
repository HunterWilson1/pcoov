const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Balsamic = sequelize.define('Balsamic', {
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
  pairings: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Balsamic;
