const Artista = require('../models/artista');

const findArtista = async(req, res) => {
    let artistaId = req.params.id;
    console.log("req: ", artistaId);
    try {
        // nao retorna obj correto ?
        const artista = await Artista.findOne({ publicId: Number(artistaId) });
        console.log("get: ", artista.publicId);
        res.send(
            artista == [] 
            ? (404, { msg: 'Artista não encontrado.'}) 
            : artista
        );
    } catch(err) {
        console.error(`Houve um erro ao buscar artista: ${err}`)
        res.send(404, { msg: err });
    }
}

const addArtista = async(req, res) => {
    const newArtista = new Artista(req.body);

    await newArtista.save().then(res => {
        res.send(200, { body: body[0] });
    }).catch(err => {
        console.error(`Houve um erro ao tentar adicionar artista: ${err}`)
        res.send(404, { msg: err });
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