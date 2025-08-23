const express = require('express');
const router = express.Router();
const auth = require('../auth/jwt-auth');
const { getStats } = require('../api/store');
const { isOwner } = require('../auth/role-check')

router.use(auth);
router.get('/dashboard', isOwner, getStats);

module.exports = router;