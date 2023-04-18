const Coletivos = require('../models/coletivos');

const getAllColetivos = async (req, res) => {
    const { page, limit = 12, search = '' } = req.query;
    const searchQuery = search !== '' ? { nome: { $regex: '^' + search, $options: 'i' } } : {};

    const estimatedCount = await Coletivos.countDocuments();

    await Coletivos.find(searchQuery)
            .sort({ nome: 1 })
            .collation({ locale: "pt" })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()
            .then(response => {
                res.status(200).send({ 
                    count: estimatedCount,
                    totalPages: Math.ceil(estimatedCount / limit),
                    coletivos: response,
                });
            }).catch(err => {
                res.status(401).send({ status: 401, msg: err.errors });
            });
};

const getColetivo = async (req, res) => {
    let coletivoId = Number(req.params.id);

    await Coletivos.findOne({ publicId: coletivoId }).then(response => {
        res.status(200).send({ coletivo: response });
    }).catch(err => {
        res.status(401).send({ status: 401, msg: err.errors });
    })
};

module.exports = {
    getAllColetivos,
    getColetivo
}