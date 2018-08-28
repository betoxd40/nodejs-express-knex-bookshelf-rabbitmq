'use strict';

// Update with your config settings.
require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: 'restaurantDB'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: 'restaurantDB',
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};