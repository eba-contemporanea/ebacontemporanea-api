const express = require('express');
const { getPublications } = require('../controllers/publicacoesController');

const router = express.Router();

router.get('/', getPublications);

module.exports = router;