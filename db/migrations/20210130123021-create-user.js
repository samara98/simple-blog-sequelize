'use strict';
const { DataTypes } = require('sequelize');

const sequelize = require('../connection');

const IQuery = sequelize.getQueryInterface();

module.exports = {
  up: async (queryInterface = IQuery, Sequelize = DataTypes) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface = IQuery, Sequelize = DataTypes) => {
    await queryInterface.dropTable('Users');
  },
};
