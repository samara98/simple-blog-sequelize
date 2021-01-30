if (process.env.NODE_ENV === undefined) {
  const dotenv = require('dotenv');
  dotenv.config({ debug: true });
}

const config = {
  development: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
  test: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
  production: {
    dialect: 'postgres',
    url: process.env.DATABASE_URL,
  },
};

module.exports = config;
