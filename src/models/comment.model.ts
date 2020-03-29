import { Sequelize, DataTypes } from 'sequelize';
import { ModelSequelizeInterfaceStatic } from '../types/sequelize';

module.exports = (sequelize: Sequelize) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: new DataTypes.TEXT(),
    },
    movieId: {
      type: DataTypes.INTEGER,
    },
  }) as ModelSequelizeInterfaceStatic;

  Comment.associate = (models) => {
    // Association to User
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });
  };

  return Comment;
};
