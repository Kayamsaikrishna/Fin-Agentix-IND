const express = require('express');
const router = express.Router();
const aadhaarRoutes = require('./aadhaar.routes');

router.use('/verify/aadhaar', aadhaarRoutes);

module.exports = router;