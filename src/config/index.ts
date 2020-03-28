import dotenv from 'dotenv';

// Set default PORT
const PORT = process.env.PORT || 3000;

const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Port
   */
  port: PORT,

  /**
   * DB
   */
  database: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    name: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};
