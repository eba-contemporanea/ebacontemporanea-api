const { object, string, number, array } = require("joi");

const schema = object({
    "id": number().required(),
    "nome": string().required(),
    "fotoPerfil": string(),
    "fotoBanner": string(),
    "localNascimento": string(),
    "localAtual": string(),
    "estudos": array([{
        "id": number().required(),
        "tipo": string().required(),
        "area": string().required(),
        "anoInicio": number(),
        "anoFim": number()
    }]),
    "profissao": string(),
    "biografia": string(),
    "links": array([{
        "id": number().required(),
        "nome": string().required(),
        "url": string().required(),
    }]),
    "obras": array([{
        "id": number().required(),
        "img": string().required(),
        "nome": string().required(),
    }]),
    "outrosTextos": array([{
        "id": number().required(),
        "url": string().required(),
        "titulo": string().required(),
    }]),
    "entrevistas": array([{
        "id": number().required(),
        "nome": string().required(),
        "url": string().required(),
    }]),
    "galeriasComerciais": array([{
        "id": number().required(),
        "nome": string().required(),
        "url": string().required(),
    }]),
    "eventos": array([{
        "id": number().required(),
        "nome": string().required(),
        "url": string().required(),
    }]),
    "premios": array([{
        "id": number().required(),
        "nome": string().required(),
        "url": string().required(),
    }])
});

module.exports = schema;