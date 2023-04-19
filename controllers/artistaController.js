var mongoose = require('mongoose');
const { getAvailableLetters } = require('../helpers/getAvailableLetters');
const Artista = require('../models/artista');

const getAllIds = async(req, res, isInternalCall = false) => {
    try {
        const artistas = await Artista.find();

        if (artistas == []) {
            if(isInternalCall) return [];

            res.status(204).send({ msg: 'Nenhum ID encontrado.' })
        } else {
            let publicIds = artistas.map(artista => artista.publicId);

            if(isInternalCall) return publicIds;
            
            res.status(200).send({
                ids: publicIds,
            });
            
        }

    } catch (err) {
        console.error(`Houve um erro ao buscar artista: ${err}`)
        res.status(500).send({ msg: err });
    }
}

const findArtista = async (req, res) => {
    let artistaId = Number(req.params.id);

    try {
        let artista = await Artista.findOne({ publicId: artistaId });

        const ids = await getAllIds({}, {}, isInternalCall);
        const currentIdIndex = ids.findIndex(artista.publicId);

        const previous = ids[currentIdIndex - 1];
        const next = ids[currentindex + 1];

        if (artista) {
            res.status(200).send({
                artista,
                navigation: {
                    previous,
                    next,
                }
            });
        } else {
            res.status(400).send({ msg: 'Artista não encontrado.' })
        }
    } catch (err) {
        console.error(`Houve um erro ao buscar artista: ${err}`)
        res.status(500).send({ msg: err });
    }
}

const getArtists = async (req, res) => {
    const { page, limit = 12, search = '', getAll = false } = req.query;
    const searchRegex = new RegExp(`^${search}`)
    const searchQuery = search !== '' ? { nome: { $regex: searchRegex, $options: "iu" } } : {};

    let allArtistas, allPaginatedArtists, paginatedArtistas, estimatedCount, publicIds;

    try {
        allArtistas = await Artista
            .find()
            .sort({ nome: 1 })
            .collation({ locale: "pt" })
            .exec();
            
        allPaginatedArtists = await Artista
            .find(searchQuery)
            .sort({ nome: 1 })
            .collation({ locale: 'pt' })
            .exec();

        paginatedArtistas = await Artista
            .find(searchQuery)
            .sort({ nome: 1 })
            .collation({ locale: "pt" })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        estimatedCount = search !== '' ? allPaginatedArtists.length : await Artista.countDocuments();
        publicIds = allArtistas.map(artista => artista.publicId);

        if (allArtistas == [] || paginatedArtistas == []) {
            res.status(204).send({ msg: 'Nenhum artista encontrado.' })
        } else {
            res.status(200).send({
                count: estimatedCount,
                totalPages: Math.ceil(estimatedCount / limit),
                availableLetters: getAvailableLetters(allArtistas),
                artists: getAll ? allArtistas : paginatedArtistas,
                allIds: publicIds,
            });
        }
    } catch (err) {
        console.error(`Houve um erro ao buscar artista: ${err}`)
        res.status(500).send({ msg: err });
    }
}

const addArtista = async (req, res) => {
    const newArtista = new Artista({ _id: new mongoose.Types.ObjectId(), ...req.body });

    await newArtista.save().then(response => {
        res.status(200).send({
            msg: "Artista adicionado com sucesso!",
            artist: { id: response.publicId }
        });
    }).catch(err => {
        console.error(`Houve um erro ao tentar adicionar artista: ${err}`)
        res.status(500).send({ msg: err.message });
    });
}

const editArtista = async (req, res) => {
    const id = req.params.id;

    if(id != null) {
        await Artista.findOneAndUpdate(
            { publicId: id },
            { '$set': req.body },
            { new: true }
        ).then(response => {
            res.status(200).send({ artist: response });
        }).catch(err => {
            res.status(500).send({ msg: err });
        });
    } else {
        res.status(401).send({ msg: "ID parameter is missing." })
    }

}

const deleteArtista = async (req, res) => {
    const id = req.params.id;

    if(id != null) {
        await Artista.findOneAndDelete({ publicId: id }).then(response => {
            res.status(200).send({ msg: `Artista ${id} foi deletado com sucesso.` });
        }).catch(err => {
            res.status(500).send({ msg: err });
        });
    } else {
        res.status(401).send({ msg: "ID parameter is missing." })
    }

}

module.exports = {
    getArtists,
    findArtista,
    addArtista,
    editArtista,
    deleteArtista,
    getAllIds
}