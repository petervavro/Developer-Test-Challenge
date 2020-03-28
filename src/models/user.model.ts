import { Sequelize, DataTypes } from 'sequelize';

module.exports = (sequelize: Sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: new DataTypes.STRING(),
      unique: true,
    },
    password: {
      type: new DataTypes.BLOB(),
    },
  });

  return User;
};
