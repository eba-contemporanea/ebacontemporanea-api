const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    fullText: String,
    boldText: String,
    galleryImages: [{
        img: String,
        name: String
    }]
});

module.exports = mongoose.model('Projeto', schema);