const express = require('express');
const router = express.Router();
const auth = require('../auth/jwt-auth'); 
const { getStats, getUsers, getStores, createUser, createStore } = require('../api/admin');
const { isAdmin } = require('../auth/role-check');

router.use(auth);
router.use(isAdmin);

router.get('/dashboard', getStats);
router.get('/users', getUsers);
router.get('/stores', getStores);
router.post('/create-user', createUser);
router.post('/create-store', createStore);

module.exports = router;