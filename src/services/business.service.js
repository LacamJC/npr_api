const {Business} = require("../models/assosiations")

exports.getAllBusiness = async () => {
    return await Business.findAll()
}

exports.create = async (data) => {
    const {name , cnpj, description} = data 

    if(name === null || name === undefined || name.trim().length <= 1 || name.length <= 0 || typeof(name) !== "string")
    {
        return {message: "Nome de empresa inválida"}
    }

    if(cnpj === null || cnpj === undefined || cnpj.trim().length <= 1 || cnpj.length != 14 || typeof(cnpj) !== "string" )
    {
        return {message: "CNPJ inválido"}
    }

    if(description === null || description === undefined || description.trim() <= 1 || description.length <= 0 || typeof(description) !== "string")
    {
        return {message: "Descrição inválida"}
    }

    return await Business.create({
        name : name,
        cnpj : cnpj,
        description : description
    })
}