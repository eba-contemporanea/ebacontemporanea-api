const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    date: String,
    link: String,
    title: String
});

module.exports = mongoose.model('Publicacoes', schema);