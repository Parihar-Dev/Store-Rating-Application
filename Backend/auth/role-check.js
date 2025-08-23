const {createError} = require('./error-handler');

const hasRole = (role) => (req, res, next) => {
    if (req.user && req.user.role === role) {
        next();
    } else {
        throw createError(403, 'Access denied');
    }
};

const isAdmin = hasRole('admin');
const isOwner = hasRole('owner');

module.exports = { isAdmin, isOwner };