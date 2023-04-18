const express = require('express');
const router = express.Router();
const { getAllColetivos, getColetivo } = require('../controllers/coletivosController');

router.get('/', getAllColetivos);
router.get('/:id', getColetivo);
router.post('/');
router.put('/:id');
router.delete('/:id');

module.exports = router;