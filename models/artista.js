const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: ObjectId,
    nome: String,
    fotoPerfil: String,
    fotoBanner: String,
    localNascimento: String,
    localAtual: String,
    estudos: [{
        id: ObjectId,
        nivel: String,
        area: String,
        anoInicio: Number,
        anoFim: Number,
    }],
    profissao: String,
    biografia: String,
    links: [{
        id: ObjectId,
        nome: String,
        url: String,
    }],
    obras: [{
        id: ObjectId,
        img: String,
        nome: String,
    }],
    outrosTextos: [{
        id: ObjectId,
        url: String,
        titulo: String,
    }],
    entrevistas: [{
        id: ObjectId,
        nome: String,
        url: String,
    }],
    galeriasComerciais: [{
        id: ObjectId,
        nome: String,
        url: String,
    }],
    eventos: [{
        id: ObjectId,
        nome: String,
        url: String,
    }],
    premios: [{
        id: ObjectId,
        nome: String,
        url: String,
    }]
});

module.exports = mongoose.model('Artista', schema);