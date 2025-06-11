const express = require('express');
const { getUfrjpageInformation, setUfrjpageInformation } = require('../controllers/ufrjController');

const router = express.Router();

router.get('/', getUfrjpageInformation);
router.put('/', setUfrjpageInformation);

module.exports = router;