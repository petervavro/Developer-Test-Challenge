import dotenv from 'dotenv';

// Set default PORT
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || '';

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
   * Your secret sauce
   */
  jwtSecret: JWT_SECRET,

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  /**
   * themoviedb.org API configs
   */
  themoviedb: {
    url: process.env.TMDB_API_URL,
    apiKey: process.env.TMDB_API_KEY,
  },
};
