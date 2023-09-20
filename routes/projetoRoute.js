const express = require('express');
const { getProjetoInfo } = require('../controllers/projetoController');

const router = express.Router();

router.get('/', getProjetoInfo);

module.exports = router;