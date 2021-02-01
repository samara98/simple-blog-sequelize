'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize, DT = DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id', as: 'commentator' });
      this.belongsTo(models.Post, { foreignKey: 'post_id', targetKey: 'id', as: 'post' });
    }
  }
  Comment.init(
    {
      user_id: {
        type: DT.INTEGER,
      },
      post_id: {
        type: DT.INTEGER,
      },
      content: {
        type: DT.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return Comment;
};
