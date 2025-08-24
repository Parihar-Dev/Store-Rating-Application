const validator = require('validator');
const { createError } = require('../auth/error-handler');

const validateUserRegistration = (name, email, password, address) => {

    if (!name || name.length < 20 || name.length > 60) {
        throw createError(400, "Name must be between 20 and 60 characters.");
    }

    if (address && address.length > 400) {
        throw createError(400, "Address must be up to 400 characters.");
    }

    if (!password || password.length < 8 || password.length > 16) {
        throw createError(400, "Password must be 8-16 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
        throw createError(400, "Password must contain at least one uppercase letter.");
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        throw createError(400, "Password must contain at least one special character.");
    }
    
    if (!email || !validator.isEmail(email)) {
        throw createError(400, "Please enter a valid email address.");
    }
};

module.exports = { validateUserRegistration };