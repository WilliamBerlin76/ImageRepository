// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: "localhost",
      database: process.env.DB_DEV_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  // development: {
  //   client: 'pg',
  //   connection: {
  //     host: "localhost",
  //     database: process.env.DB_ENV_DATABASE,
  //     user: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD
  //   },
  //   useNullAsDefault: true,
  //   migrations: {
  //     directory: "./database/migrations"
  //   },
  //   seeds: {
  //     directory: "./database/seeds"
  //   }
  // },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/tests.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // useNullAsDefault: true,
    ssl: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: "./database/seeds"
    },
  },
};
