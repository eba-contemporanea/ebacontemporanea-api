const express = require('express');
const { 
    addArtista, 
    findArtista, 
    editArtista, 
    deleteArtista,
    getArtists,
    getAllIds
} = require('../controllers/artistaController');

const router = express.Router();

router.get('/', getArtists);

router.get('/:id', findArtista);

router.get('/allids', getAllIds);

router.post('/new', addArtista);

router.put('/:id', editArtista);

router.delete('/:id', deleteArtista);

module.exports = router;