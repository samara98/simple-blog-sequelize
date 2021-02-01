'use strict';
const { DataTypes } = require('sequelize');

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
      'UserProfiles',
      [
        {
          id: 1,
          user_id: 1,
          name: 'Testo Test',
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
    await queryInterface.bulkDelete('UserProfiles', null, {});
  },
};
