const Publicacoes = require('../models/publicacoes');

const getPublications = async (req, res) => {
    await Publicacoes.find().then(response => {
        const allYears = response.map(post => ( post?.date ));
        const filteredYears = [...new Set(allYears)].sort((a, b) => b - a);

        const result = {};

        response.forEach(entry => {
            const { date } = entry;

            if (!result[date]) {
                result[date] = [];
            }
            
            result[date].push(entry);
        });

        res.status(200).send({ data: response, years: filteredYears, separatedData: result });
    }).catch(error => {
        res.status(404).send(error);
    })
}

module.exports = {
    getPublications,
}