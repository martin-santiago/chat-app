
const Sequelize = require('sequelize');

const db = require('../config/database');

const Chat = db.define('chat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uid1: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name1: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: false
    },
    uid2: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: false,
    },
    name2: {
        type: Sequelize.STRING,
        allowNull:false,
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

module.exports = Chat;