const { Op } = require('sequelize');
const { asyncHandler, createError, sendResponse } = require('../auth/error-handler');
const { User, Store, Rating } = require('../database');
const { comparePassword, hashPassword } = require('../helper/token');

// Function to submit rating
exports.submitRating = asyncHandler(async(req, res) => {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (!userId) {
        throw createError(401, 'User not authenticated');
    }
    if (!storeId || !rating) {
        throw createError(400, 'Store ID and rating are required');
    }
    if (rating < 1 || rating > 5) {
        throw createError(400, 'Rating must be between 1 and 5');
    }

    const existingRating = await Rating.findOne({
        where: { userId, storeId }
    });
    if (existingRating) {
        throw createError(400, 'You have already rated this store');
    }

    const newRating = await Rating.create({
        userId,
        storeId,
        rating
    });

    const storeRatings = await Rating.findAll({ where: { storeId } });
    const totalRatingSum = storeRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = Number(totalRatingSum / storeRatings.length).toFixed(1);

    sendResponse(res, 201, {
        message: 'Rating submitted successfully',
        rating: newRating,
        averageRating
    });
});

// Function to update rating
exports.updateRating = asyncHandler(async(req, res) => {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (!userId) {
        throw createError(401, 'User not authenticated');
    }
    if (!storeId || !rating) {
        throw createError(400, 'Store ID and rating are required');
    }
    if (rating < 1 || rating > 5) {
        throw createError(400, 'Rating must be between 1 and 5');
    }

    const existingRating = await Rating.findOne({
        where: { userId, storeId }
    });
    if (!existingRating) {
        throw createError(404, 'Rating not found');
    }

    existingRating.rating = rating;
    await existingRating.save();
    
    const storeRatings = await Rating.findAll({ where: { storeId } });
    const totalRatingSum = storeRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = Number(totalRatingSum / storeRatings.length).toFixed(1);

    sendResponse(res, 200, {
        message: 'Rating updated successfully',
        rating: existingRating,
        averageRating
    })
});

// Function to update password
exports.updatePassword = asyncHandler(async(req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (!userId) {
        throw createError(401, 'User not authenticated');
    }
    if (!oldPassword || !newPassword) {
        throw createError(400, 'Old and new passwords are required');
    }

    let user;
    if (userRole === 'user' || userRole === 'admin') {
        user = await User.findByPk(userId);
    } else if (userRole === 'owner') {
        user = await Store.findByPk(userId);
    }

    if (!user) {
        throw createError(400, 'User not found');
    }

    const match = await comparePassword(oldPassword, user.password);
    if (!match) {
        throw createError(401, 'Invalid old password');
    }
    const hashed = await hashPassword(newPassword);
    user.password = hashed;
    await user.save();

    sendResponse(res, 200, {
        message: 'Password updated successfully'
    });
})

// Function to get all stores
exports.getStores = asyncHandler(async (req, res) => {
    const {name, address} = req.query;
    const userId = req.user.id;

    if (!userId) {
        throw createError(401, 'User not authenticated');
    }

    const filters = {};
    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (address) filters.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
        where: filters
    });
    const storeIds = stores.map(store => store.id);

    const ratings = await Rating.findAll({
        where: { storeId: { [Op.in]: storeIds } },
        include: [{model: User}]
    });

    const storeList = stores.map(store => {
        const storeRatings = ratings.filter(r => r.storeId === store.id);
        const averageRating = storeRatings.length > 0 ? Number(storeRatings.reduce((acc, r) => acc + r.rating, 0) / storeRatings.length).toFixed(1) : 0;
        const userRating = storeRatings.find(r => r.userId === userId);

        return {
            ...store.toJSON(),
            averageRating,
            userRating: userRating ? userRating.rating : null,
            ratingId: userRating ? userRating.id : null
        };
    });

    sendResponse(res, 200, {
        stores: storeList 
    });
});

// Function to get profile
exports.getProfile = asyncHandler(async(req, res) => {
    const { id, role } = req.user;
    let user;

    if (role === 'owner') {
        user = await Store.findByPk(id, {
            attributes: { exclude: ['password']}
        });
    } else {
        user = await User.findByPk(id, {
            attributes: { exclude: ['password']}
        });
    }

    if (!user) {
        throw createError(404, 'User not found');
    }

    sendResponse(res, 200, {
        user: { ...user.toJSON(), role}
    });
})