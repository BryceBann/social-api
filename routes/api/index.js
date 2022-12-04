const router = require('express').Router();
const userRoutes = require('./route-thoughts');
const thoughtRoutes = require('./');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;