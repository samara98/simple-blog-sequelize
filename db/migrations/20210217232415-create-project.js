'use strict';
const { DataTypes } = require('sequelize');

const sequelize = require('../connection');

const IQuery = sequelize.getQueryInterface();

module.exports = {
  up: async (queryInterface = IQuery, Sequelize = DataTypes) => {
    await queryInterface.createTable('Project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Project');
  },
};
