const Sequelize = require('sequelize');
const database = require('./db.js');

const Conex = database.define('Teste_conecxao', { //nome da tabela a ser conectada
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    msg: Sequelize.STRING(100),

}, { freezeTableName: true }); // função para conectar tebela ja criada

//criar ou sicronizar a tabela
// Contador.sync(); 

module.exports = Conex;
