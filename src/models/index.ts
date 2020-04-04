import config from '../config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Sequelize = require('sequelize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const basename = path.basename(__filename);

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
      idle: 10000
    }
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // Import model
    const model = sequelize.import(path.join(__dirname, file));

    db[model.name] = model;
  });

// Associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Database synchronization
// https://sequelize.org/v5/manual/models-definition.html
sequelize
  .sync() // { force: true }
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database & tables created!');
  });

module.exports = {
  ...db,
  sequelize,
  Sequelize
};
