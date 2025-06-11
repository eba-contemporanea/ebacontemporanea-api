const express = require('express');
const { getEbapageInformation, setEbapageInformation } = require('../controllers/ebaController');

const router = express.Router();

router.get('/', getEbapageInformation);
router.put('/', setEbapageInformation);

module.exports = router;