const express = require('express');
const { getHomepageInformation } = require('../controllers/homepageController');

const router = express.Router();

router.get('/', getHomepageInformation);

module.exports = router;