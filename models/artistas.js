const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    nome: String,
    cover: File
})

module.exports = mongoose.model('Artistas', schema);
