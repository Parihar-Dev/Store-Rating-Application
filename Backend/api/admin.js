const { Op } = require('sequelize');
const db = require('../db');
const { asyncHandler, createError, sendResponse } = require('../auth/error-handler');
const { User, Store, Rating } = require('../database');
const { hashPassword } = require('../helper/token');
const { validateRegistration } = require('../helper/validation');

// Function to get overall stats for admin dashboard
exports.getStats = asyncHandler(async (req, res) => {
    const [totalUsers, totalStores, totalRatings] = await Promise.all([
        User.count(),
        Store.count(),
        Rating.count()
    ]);
    sendResponse(res, 200, { totalUsers, totalStores, totalRatings});
});

// Function to get users data
exports.getUsers = asyncHandler(async(req, res) => {
    const { count, rows } = await User.findAndCountAll({
        attributes: { exclude: ['password']}
    });

    sendResponse(res, 200, { 
        totalUsers: count,
        users: rows,
    });
});

// Function to get stores data
exports.getStores = asyncHandler(async(req, res) => {
    const { count, rows: stores } = await Store.findAndCountAll({});
    const storeIds = stores.map(store => store.id);

    const ratings = await Rating.findAll({
        attributes: [
            'storeId',
            [db.fn('AVG', db.col('rating')), 'averageRating']
        ],
        where: { storeId: { [Op.in]: storeIds } },
        group: ['storeId']
    });

    const averageRatingsMap = ratings.reduce((acc, rating) => {
        acc[rating.storeId] = Number(Number(rating.dataValues.averageRating).toFixed(1));
        return acc;
    }, {});
    
    const storesWithRatings = stores.map(store => {
        return {
            ...store.toJSON(),
            overallRating: averageRatingsMap[store.id] || 0
        };
    });

    sendResponse(res, 200, {
        totalStores: count,
        stores: storesWithRatings,
    });
});

// Function to create a user
exports.createUser = asyncHandler(async(req, res) => {
    const { name, email, password, address, role } = req.body;

    validateRegistration(name, email, password, address);
    const userRole = (role === 'admin' || role === 'user') ? role : 'user';

    const exists = await User.findOne({ where: {email} });
    if (exists) {
        throw createError(400, 'User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        role: userRole
    });

    const { password: _, ...userData } = user.toJSON();

    sendResponse(res, 200, {
        message: 'User created successfully',
        user: userData
    });
});

// Function to create Store
exports.createStore = asyncHandler(async(req, res) => {
    const { name, email, password, address } = req.body;

    validateRegistration(name, email, password, address);

    const storeExists = await Store.findOne({ where: {email} });
    if (storeExists) {
        throw createError(400, 'Store with this email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const store = await Store.create({
        name,
        email,
        password: hashedPassword,
        address
    });

    sendResponse(res, 201, {
        message: 'Store created successfully',
        store
    });
});