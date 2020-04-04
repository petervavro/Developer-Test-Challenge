import { Sequelize, DataTypes } from 'sequelize';
import { ModelSequelizeInterfaceStatic } from '../types/sequelize';

module.exports = (sequelize: Sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: new DataTypes.STRING(),
      unique: true
    },
    password: {
      type: new DataTypes.BLOB()
    }
  }) as ModelSequelizeInterfaceStatic;

  User.associate = (models) => {
    models.User.hasMany(models.Comment, { foreignKey: 'userId' });
    models.User.hasOne(models.Rating, { foreignKey: 'userId' });
  };

  return User;
};
