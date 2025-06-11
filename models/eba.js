const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: ObjectId,
    galleryImages: [{
        img: String,
        name: String
    }],
    references: {
        type: [String],
        default: [],
    },
    timeline: [{
        date: String,
        text: String
    }],
    boldTexts: {
        type: [String],
        default: [],
    },
    underlinedTexts: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('eba', schema);