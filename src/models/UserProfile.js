'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DT = DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
    }
  }

  UserProfile.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      datebirth: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'UserProfile',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return UserProfile;
};
