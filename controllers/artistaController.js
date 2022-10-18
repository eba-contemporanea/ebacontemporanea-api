const { getAvailableLetters } = require('../helpers/getAvailableLetters');
const Artista = require('../models/artista');

const findArtista = async(req, res) => {
    let artistaId = Number(req.params.id);

    try {
        let artista = await Artista.findOne({ publicId: artistaId });
        
        const [previousArtist] = await Artista.find({publicId: {$gt: artistaId}}).sort({ name: 1 }).limit(1);
        const [nextArtist] = await Artista.find({publicId: {$lt: artistaId}}).sort({ name: -1 }).limit(1);

        if(artista) {
            res.status(200).send({
                artista,
                navigation: {
                    previous: previousArtist ? previousArtist.publicId : 1,
                    next: nextArtist ? nextArtist.publicId : artistaId + 1,
                }
            });
        } else {
            res.status(400).send({ msg: 'Artista não encontrado.'})
        }
    } catch(err) {
        console.error(`Houve um erro ao buscar artista: ${err}`)
        res.status(404).send({ msg: err });
    }
}

const getArtists = async(req, res) => {
    const { page, limit = 12, search = '', getAll = false } = req.query;
    const searchQuery = search !== '' ? { nome: { $regex: '^' + search, $options: 'i'} } : {};

    let allArtistas, paginatedArtistas, estimatedCount, publicIds;

    try {
        allArtistas = await Artista.find().sort({ nome: 1 }).exec();
        paginatedArtistas = await Artista.find(searchQuery).sort({ nome: 1 }).limit(limit * 1).skip((page - 1) * limit).exec();

        estimatedCount = search !== '' ? paginatedArtistas.length : await Artista.countDocuments();
        publicIds = allArtistas.map(artista => artista.publicId);

        if(allArtistas == [] || paginatedArtistas == []) {
            res.status(204).send({ msg: 'Nenhum artista encontrado.'})
        } else {
            res.status(200).send({ 
                count: estimatedCount,
                totalPages: Math.round(estimatedCount / 12),
                availableLetters: getAvailableLetters(allArtistas),
                artists: getAll ? allArtistas : paginatedArtistas,
                allIds: publicIds,
            });
        }
    } catch(err) {
        console.error(`Houve um erro ao buscar artista: ${err}`)
        res.status(404).send({ msg: err });
    }
}

const addArtista = async(req, res) => {
    const newArtista = new Artista(req.body);

    await newArtista.save().then(res => {
        res.status(200).send({ body: body[0] });
    }).catch(err => {
        console.error(`Houve um erro ao tentar adicionar artista: ${err}`)
        res.status(404).send({ msg: err });
    });
}

const editArtista = async(req, res) => {
    const editedArtist = await Artista.findOneAndUpdate({ publicId: req.params.id }, req.body, { new: true }, (err, doc) => {
        if(err) res.status(400).send({ msg: err });
    });

    res.status(200).send({ artist: editedArtist });
}

const deleteArtista = async(req, res) => {
    await Artista.findOneAndDelete({ publicId: req.params.id }).then(res => {
        res.status(200).send(`Artista do id ${req.params.id} foi deletado com sucesso.`);
    }).catch(err => {
        res.status(500).send(`Algo deu errado: ${err}`);
    });
}

module.exports = {
    getArtists,
    findArtista,
    addArtista,
    editArtista,
    deleteArtista
}