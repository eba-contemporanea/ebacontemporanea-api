const { ObjectId } = require('mongodb');
const ufrj = require('../models/ufrj');

const getUfrjpageInformation = async (req, res) => {
    await ufrj.find().then(response => {
        res.status(200).send({ data: response });
    }).catch(error => {
        res.status(404).send(error);
    })
}

const setUfrjpageInformation = async (req, res) => {
    await ufrj.findOneAndUpdate(
        { _id: ObjectId('6844e7cff11161670bcee64a') },
        { '$set': req.body },
        { new: true }
    ).then(response => {
        res.status(200).send({ data: response });
    }).catch(err => {
        res.status(500).send({ msg: err });
    });
}

module.exports = {
    getUfrjpageInformation,
    setUfrjpageInformation
}