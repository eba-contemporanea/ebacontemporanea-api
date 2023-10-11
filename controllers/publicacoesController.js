const Publicacoes = require('../models/publicacoes');

const getPublications = async (req, res) => {
    await Publicacoes.find().then(response => {
        res.status(200).send({ data: response });
    }).catch(error => {
        res.status(404).send(error);
    })
}

module.exports = {
    getPublications,
}