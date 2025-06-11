const { ObjectId } = require('mongodb');
const eba = require('../models/eba');

const getEbapageInformation = async (req, res) => {
    await eba.find().then(response => {
        res.status(200).send({ data: response });
    }).catch(error => {
        res.status(404).send(error);
    })
}

const setEbapageInformation = async (req, res) => {
    await eba.findOneAndUpdate(
        { _id: ObjectId('6844999086c2a71b919dd6f9') },
        { '$set': req.body },
        { new: true }
    ).then(response => {
        res.status(200).send({ data: response });
    }).catch(err => {
        res.status(500).send({ msg: err });
    });
}

module.exports = {
    getEbapageInformation,
    setEbapageInformation
}