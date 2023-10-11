const { ObjectId } = require('mongodb');
const Home = require('../models/homepage');

const getHomepageInformation = async (req, res) => {
    await Home.find().then(response => {
        res.status(200).send({ data: response });
    }).catch(error => {
        res.status(404).send(error);
    })
}

const setHomepageInformation = async (req, res) => {
    await Home.findOneAndUpdate(
        { _id: ObjectId('6442b5c9abfa222e87eaeb40') },
        { '$set': req.body },
        { new: true }
    ).then(response => {
        res.status(200).send({ data: response });
    }).catch(err => {
        res.status(500).send({ msg: err });
    });
}

module.exports = {
    getHomepageInformation,
    setHomepageInformation
}