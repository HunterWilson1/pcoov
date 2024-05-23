const sequelize = require('../connection');
const Balsamic = require('./balsamic');
const OliveOil = require('./oliveoil');

const syncModels = async () => {
  try {
    await sequelize.sync({ force: true }); // Force sync for initial setup, use { alter: true } for later migrations
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }
};

module.exports = {
  Balsamic,
  OliveOil,
  syncModels,
};
