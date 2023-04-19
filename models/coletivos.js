const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    banner: String,
    nomeColetivo: String,
    fotoCard: String,
    participantes: [{
        nome: String,
        publicId: Number
    }],
    sobre: {
        texto: String,
        autor: String,
    },
    obras: {
        img: String,
        nome: String,
    },
    videos: {
        link: String,
        nome: String,
    },
    textos: {
        link: String,
        nome: String,
    },
    publicId: Number,
    active: Boolean
});


module.exports = mongoose.model('Coletivo', schema);