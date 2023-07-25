require('dotenv').config();

module.exports = {
  dev: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: null,
    database: 'sequelize_tutorial',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: null,
    database: 'sequelize_tutorial',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  SECRET_KEY: 'secret',
};
