'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DT = DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: {
          model: models.User_Project,
        },
        foreignKey: 'project_id',
        targetKey: 'id',
        as: 'users',
      });
    }
  }
  Project.init(
    {
      name: DT.STRING,
    },
    {
      sequelize,
      modelName: 'Project',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return Project;
};
