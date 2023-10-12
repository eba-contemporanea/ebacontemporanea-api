const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    date: Number,
    link: String,
    name: String
});

module.exports = mongoose.model('Publicacoes', schema);