const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Store = require('./store');
const User = require('./user');

const Rating = sequelize.define('Rating', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
});

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });
Store.hasMany(Rating, { foreignKey: 'storeId' });
Rating.belongsTo(Store, { foreignKey: 'storeId' });

module.exports = Rating;