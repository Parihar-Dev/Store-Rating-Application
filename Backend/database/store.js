const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Store = sequelize.define('Store', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = Store;