const database = require('../database.json');

const getAllArtistas = (req, res) => {
    const artistas = database.artista;

    res.send(artistas);
}

const findArtista = (req, res) => {
    const artistaId = req.params.id;
    const [artista] = database.artista.filter(a => a.id == artistaId);

    res.send(
        artista === undefined 
        ? (404, { msg: 'Artista não encontrado.'}) 
        : artista
    );
}

const addArtista = (req, res, next) => {
    const body = req;
    res.send({ body: body[0] });
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