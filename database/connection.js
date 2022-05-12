require('dotenv').config()
const Sequelize = require('sequelize');

const database = 'redebrasilrp';
const username = 'redebrasilrp';
const password = 'rbrp2017';
const host = 'mysql.redebrasilrp.com.br';
const dialect = 'mysql';



const connection = new Sequelize(database, username, password, {
    host,
    dialect
})


module.exports = connection;