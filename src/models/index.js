'use strict';

// const fs = require('fs');
// const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const cfg = require('../../config/database');
const config = cfg[env];
// const db = {};

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

const User = require('./User')(sequelize, DataTypes);
const UserProfile = require('./UserProfile')(sequelize, DataTypes);
const Post = require('./Post')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);
const Project = require('./Project')(sequelize, DataTypes);
const User_Project = require('./User_Project')(sequelize, DataTypes);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, DataTypes);
//     db[model.name] = model;
//   });

const db = {
  User,
  UserProfile,
  Post,
  Comment,
  Project,
  User_Project,
  sequelize,
  Sequelize,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
