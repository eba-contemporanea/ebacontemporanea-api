const express = require('express');
const { getHomepageInformation, setHomepageInformation } = require('../controllers/homepageController');

const router = express.Router();

router.get('/', getHomepageInformation);
router.put('/', setHomepageInformation);

module.exports = router;