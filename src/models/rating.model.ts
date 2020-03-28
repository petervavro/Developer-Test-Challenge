import { Sequelize, DataTypes } from 'sequelize';
import { ModelSequelizeInterfaceStatic } from '../types/sequelize';

module.exports = (sequelize: Sequelize) => {
  const Rating = sequelize.define('Rating', {
    movieId: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  }) as ModelSequelizeInterfaceStatic;

  Rating.associate = (models) => {
    // Association to User
    models.Rating.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });
  };

  return Rating;
};
