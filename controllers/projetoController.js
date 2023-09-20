const Projeto = require('../models/projeto');

const getProjetoInfo = async (req, res) => {
    await Projeto.find().then(response => {
        res.status(200).send({ data: response });
    }).catch(error => {
        res.status(404).send(error);
    })
}

module.exports = {
    getProjetoInfo,
}