'use strict';
const { DataTypes } = require('sequelize');

const { hashPassword } = require('../../src/helpers/hash-helper');
const sequelize = require('../connection');

const IQuery = sequelize.getQueryInterface();

module.exports = {
  up: async (queryInterface = IQuery, Sequelize = DataTypes) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          email: 'test@test.com',
          password: await hashPassword('testtest'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface = IQuery, Sequelize = DataTypes) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  },
};
