var mongoose = require('mongoose');
const Pesquisador = require('../models/pesquisadores');

const getPesquisadores = async(req, res) => {
    try {
        const pesquisadores = await Pesquisador.find();

        const coordenador = pesquisadores.filter(p => p.cargo == 'Coordenador');
        const bolsistasAtuais = pesquisadores.filter(p => p.cargo == 'Bolsista Atual');
        const bolsistasAnteriores = pesquisadores.filter(p => p.cargo == 'Bolsista Anterior');
        const voluntarios = pesquisadores.filter(p => p.cargo == 'Voluntário');

        const orderedPesquisadores = {
            coordenador,
            bolsistasAtuais,
            bolsistasAnteriores,
            voluntarios
        }

        res.status(200).send(orderedPesquisadores);
    } catch (err) {
        res.status(500).send({ status: 500, msg: err })
    }
};

const addPesquisadores = async(req, res) => {
    try {
        const newPesquisador = new Pesquisador({ _id: new mongoose.Types.ObjectId(), ...req.body });

        await newPesquisador.save().then(response => {
            res.status(200).send({
                msg: 'Pesquisador criado com sucesso!',
                pesquisador: { id: response.publicId }
            })
        }).catch(err => res.status(401).send({ status: 401, msg: err.errors }));
    } catch (err) {
        res.status(500).send({ status: 500, msg: err })
    }
}

const editPesquisadores = async(req, res) => {
    const id = req.params.id;

    if(id != null) {
        await Pesquisador.findOneAndUpdate(
            { publicId: id },
            { '$set': req.body },
            { new: true }
        ).then(response => {
            res.status(200).send({ pesquisador: response });
        }).catch(err => {
            res.status(401).send({ status: 401, msg: err });
        });
    } else {
        res.status(401).send({ status: 401, msg: 'Param ID cannot be null' });
    }
}

const deletePesquisadores = async(req, res) => {
    const id = req.params.id;

    if(id != null) {
        await Pesquisador.findOneAndDelete({ publicId: id }).then(response => {
            res.status(200).send({ msg: `Pesquisador ${id} foi deletado com sucesso.` });
        }).catch(err => {
            res.status(401).send({ status: 401, msg: err });
        });
    } else {
        res.status(401).send({ msg: 'Param ID cannot be null' });
    }
}

module.exports = {
    getPesquisadores,
    addPesquisadores,
    editPesquisadores,
    deletePesquisadores
}