// only for syntaxing
'use strict';
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const cfg = require('../config/database');
const config = cfg[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;
