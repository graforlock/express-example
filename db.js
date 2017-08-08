const Sequelize = require('sequelize');
const { SQLITE } = require('./constants');

const connection = new Sequelize(
    'database',
    SQLITE.username,
    SQLITE.password,
    {
        dialect: 'sqlite',
        storage: SQLITE.database
    }
);

module.exports = connection;
