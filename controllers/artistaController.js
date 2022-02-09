const { ObjectId } = require('mongodb');
const Artista = require('../models/artista');

const findArtista = async(req, res) => {
    let artistaId = req.params.id;
    console.log("req: ", artistaId);
    try {
        // nao retorna obj correto ?
        let artista = await Artista.findOne({ publicId: Number(artistaId) });
        console.log("get: ", artista.publicId);
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
    findArtista,
    addArtista,
    editArtista,
    deleteArtista
}