const { asyncHandler, createError, sendResponse } = require('../auth/error-handler');
const { User, Store, Rating } = require('../database');

// Function to get stats for a store
exports.getStats = asyncHandler(async(req, res) => {
    const ownerEmail = req.user.email;
    if (!ownerEmail) {
        throw createError(401, 'User not authenticated');
    }
    
    const store = await Store.findOne({
        where: { email: ownerEmail }
    });
    
    if (!store) {
        throw createError(404, 'Store not found');
    }

    const ratings = await Rating.findAll({
        where: { storeId: store.id },
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });

    const totalRatings = ratings.length;
    const averageRating = totalRatings ? Number(ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings).toFixed(1) : 0;
    
    const ratedByUsers = ratings.map((r) => ({
        id: r.User.id,
        name: r.User.name,
        email: r.User.email,
        rating: r.rating
    }));

    const dashboard = [{
        storeId: store.id,
        storeName: store.name,
        totalRatings,
        averageRating,
        ratedByUsers
    }];
    
    sendResponse(res, 200, { dashboard });
});