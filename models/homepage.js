const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    firstParagraph: {
        text: String,
        title: String,
        buttonLink: String,
    },
    secondParagraph: {
        text: String,
        title: String,
        buttonLink: String,
    },
    galleryImages: [{
        img: String,
        name: String
    }]
});

module.exports = mongoose.model('Home', schema);