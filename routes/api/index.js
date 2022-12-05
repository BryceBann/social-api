const router = require('express').Router();
const userRoutes = require('./route-users');
const thoughtRoutes = require('./route-thoughts');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;