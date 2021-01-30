'use strict';
const { DataTypes } = require('sequelize');

const sequelize = require('../connection');

const IQuery = sequelize.getQueryInterface();

module.exports = {
  up: async (queryInterface = IQuery, Sequelize = DataTypes) => {
    await queryInterface.createTable('UserProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      datebirth: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('UserProfiles');
  },
};
