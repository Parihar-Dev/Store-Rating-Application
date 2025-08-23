const express = require('express');
const router = express.Router();
const { submitRating, updateRating, updatePassword, getStores, getProfile } = require('../api/user');
const auth = require('../auth/jwt-auth');
router.use(auth);

router.post('/submit-rating', submitRating);
router.put('/update-rating', updateRating);
router.put('/update-password', updatePassword);
router.get('/stores', getStores);
router.get('/profile', getProfile);

module.exports = router;