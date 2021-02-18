'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DT = DataTypes) => {
  class User_Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.User, { foreignKey: 'id', sourceKey: 'user_id', as: 'user' });
      // this.hasMany(models.Project, { foreignKey: 'id', sourceKey: 'project_id', as: 'project' });
      // this.hasOne(models.User, { foreignKey: 'id', sourceKey: 'user_id', as: 'user' });
      // this.hasOne(models.Project, { foreignKey: 'id', sourceKey: 'project_id', as: 'project' });
      this.belongsTo(models.User, { foreignKey: 'user_id', sourceKey: 'id', as: 'user' });
      this.belongsTo(models.Project, { foreignKey: 'project_id', sourceKey: 'id', as: 'project' });
    }
  }
  User_Project.init(
    {
      user_id: {
        type: DT.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      project_id: {
        type: DT.INTEGER,
        references: {
          model: 'Project',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'User_Project',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return User_Project;
};
