const express = require('express');
const { 
    getPesquisadores, 
    addPesquisadores, 
    editPesquisadores,
    deletePesquisadores
} = require('../controllers/pesquisadoresController');
const router = express.Router();

router.get('/', getPesquisadores);
router.post('/new', addPesquisadores);
router.put('/:id', editPesquisadores);
router.delete('/:id', deletePesquisadores);

module.exports = router;