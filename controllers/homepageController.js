const Home = require('../models/homepage');

const getHomepageInformation = async (req, res) => {
    await Home.find().then(response => {
        res.status(200).send({ data: response });
    }).catch(error => {
        res.status(404).send(error);
    })
}

module.exports = {
    getHomepageInformation,
}