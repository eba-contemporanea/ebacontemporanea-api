const { object, number, string } = require('joi');

export default object({
    id: number().required(),
    nome: string().required(),
    cover: string().required()
})