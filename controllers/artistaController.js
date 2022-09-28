const Artista = require('../models/artista');

const findArtista = async(req, res) => {
    let artistaId = req.params.id;

    try {
        let artista = await Artista.findOne({ publicId: Number(artistaId) });
        
        if(artista == {}) {
            res.status(404).send({ msg: 'Artista não encontrado.'})
        } else {
            res.status(200).send(artista);
        }
    } catch(err) {
        console.error(`Houve um erro ao buscar artista: ${err}`)
        res.status(404).send({ msg: err });
    }
}

const getAllArtistas = async(req, res) => {
    const { page = 1, limit = 18 } = req.query;

    try {
        let artistas = await Artista.find().limit(limit * 1).skip((page - 1) * limit).exec();

        let orderedArtists = artistas.sort((a, b) => a.nome.localeCompare(b.nome, 'en'));
        
        if(artistas == []) {
            res.status(404).send({ msg: 'Nenhum artista encontrado.'})
        } else {
            res.status(200).send(orderedArtists);
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

const editArtista = (req, res) => {
    res.send(`Artista do id ${req.params.id} foi editado.`);
}

const deleteArtista = (req, res) => {
    res.send(`Artista do id ${req.params.id} foi deletado.`);
}

module.exports = {
    getAllArtistas,
    findArtista,
    addArtista,
    editArtista,
    deleteArtista
}