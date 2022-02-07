const express = require('express');
const { addArtista, findArtista, editArtista, deleteArtista } = require('../controllers/artistaController');

const router = express.Router();

router.get('/:id', findArtista);

router.post('/', addArtista);

router.put('/:id', editArtista);

router.delete('/:id', deleteArtista);

module.exports = router;