
const Sequelize = require('sequelize');
const db = require('../config/database');
const Message = db.define('message', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    uid: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: false
    },
    text: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: false,
    },
    createdAt: {
        allowNull: true,
        defaultValue: new Date(),
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: true,
        defaultValue: new Date(),
        type: Sequelize.DATE
    }
});

// User.hasMany(Location);

module.exports = Message;