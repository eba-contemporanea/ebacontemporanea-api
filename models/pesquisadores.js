const { object, number, string, array } = require('joi');

export default object([{
    "id": number(),
    "cargo": string(),
    "nome": string(),
    "descricao": string(),
    "links": array([{
        "url": string(),
        "nome": string(),
        "id": number()
    }])
}])