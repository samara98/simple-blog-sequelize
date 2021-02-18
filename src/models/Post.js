'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DT = DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'creator', targetKey: 'id', as: 'owner' });
      this.hasMany(models.Comment, { foreignKey: 'post_id', sourceKey: 'id', as: 'comments' });
    }
  }
  Post.init(
    {
      title: {
        type: DT.STRING,
        allowNull: false,
      },
      image_url: {
        type: DT.STRING,
        defaultValue: '',
      },
      content: {
        type: DT.STRING,
        allowNull: false,
        defaultValue: '',
      },
      creator: {
        type: DT.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return Post;
};
