const Sequelize = require('sequelize');
const database = require('./db.js');

const Agend = database.define('Calendario', { //nome da tabela a ser conectada
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    data: Sequelize.DATE,
    dia_semana: Sequelize.STRING(50),
    feriado: Sequelize.STRING(50),
   
}, { freezeTableName: true }); // função para conectar tebela ja criada

//criar ou sicronizar a tabela
// Contador.sync(); 

module.exports = Agend;
