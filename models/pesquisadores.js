const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    foto: String,
    cargo: {
        type: String,
        enum: ['Bolsista Atual', 'Bolsista Anterior', 'Coordenador', 'Voluntário'],
        default: 'Bolsista Atual'
    },
    nome: String,
    descricao: String,
    links: [{
        url: String,
        nome: String,
    }],
    publicId: Number
});

module.exports = mongoose.model('Pesquisadores', schema);