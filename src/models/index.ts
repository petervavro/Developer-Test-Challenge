import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

// Database synchronization
// https://sequelize.org/v5/manual/models-definition.html
sequelize.sync() // { force: true }
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database & tables created!');
  });

module.exports = {
  ...db,
  sequelize,
  Sequelize,
};
