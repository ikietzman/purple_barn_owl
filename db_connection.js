'use strict'

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:password@127.0.0.1:3307/purplebarnowl');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { sequelize }
