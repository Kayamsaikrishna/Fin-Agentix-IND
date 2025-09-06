const express = require('express');
const router = express.Router();
const AadhaarController = require('../controllers/aadhaar.controller');

router.post('/initiate', AadhaarController.initiateAadhaarVerification);
router.post('/verify', AadhaarController.verifyAadhaarOtp);

module.exports = router;