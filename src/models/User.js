'use strict';
const { Model, DataTypes } = require('sequelize');
const { hashPassword } = require('../helpers/hash-helper');

module.exports = (sequelize, DT = DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.UserProfile, { foreignKey: 'user_id', sourceKey: 'id', as: 'profile' });
    }
  }

  User.init(
    {
      email: {
        type: DT.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeCreate: async (user, opt) => {
          const hash = await hashPassword(user.password);
          user.password = hash;
          return;
        },
      },
    },
  );

  return User;
};
