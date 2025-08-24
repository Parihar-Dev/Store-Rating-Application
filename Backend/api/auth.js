const { asyncHandler, createError, sendResponse } = require('../auth/error-handler');
const { User, Store } = require('../database');
const { hashPassword, comparePassword, generateToken } = require('../helper/token');
const { validateRegistration } = require('../helper/validation');

// Function to register user
exports.register = asyncHandler(async(req, res) => {
    const { name, email, password, address } = req.body;

    validateRegistration(name, email, password, address);

    const exists = await User.findOne({where: {email} });
    if (exists) {
        throw createError(400, 'User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        address,
        role: 'user'
    });

    const token = generateToken(user, 'user');
    const { password: _, ...userData } = user.toJSON();

    sendResponse(res, 201, {
        message: 'User registered successfully',
        user: userData,
        token
    });
})

// Function to login user
exports.login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    const storeOwner = await Store.findOne({ where: { email } });

    let authenticateUser = null;
    let userRole = null;

    if (user && await comparePassword(password, user.password)) {
        authenticateUser = user;
        userRole = user.role;
    } else if (storeOwner && await comparePassword(password, storeOwner.password)) {
        authenticateUser = storeOwner;
        userRole = 'owner';
    }

    if (!authenticateUser) {
        throw createError(401, 'Invalid email or password');
    }


    const payload = {
        id: authenticateUser.id,
        email: authenticateUser.email,
        role: userRole
    };

    const token = generateToken(payload, userRole);
    sendResponse(res, 200, {
        message: 'Login successful',
        user: {
            id: authenticateUser.id,
            name: authenticateUser.name,
            email: authenticateUser.email,
            role: userRole
        },
        token
    });
});