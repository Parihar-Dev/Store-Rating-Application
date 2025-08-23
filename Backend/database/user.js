const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    }
});

module.exports = User;