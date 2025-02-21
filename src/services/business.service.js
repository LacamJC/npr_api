const { Business } = require("../models/assosiations")

exports.getAllBusiness = async (id) => {
    if (id) {
        console.log("E UMA ESPECIFICA ")
    }
    return await Business.findAll()
}

exports.getBusinessById = async (id) => {
    return await Business.findOne({ where: { id: id } })
}

exports.create = async (data) => {
    const { name, cnpj, description } = data

    if (name === null || name === undefined || name.trim().length <= 1 || name.length <= 0 || typeof (name) !== "string") {
        return { message: "Nome de empresa inválida" }
    }

    if (cnpj === null || cnpj === undefined || cnpj.trim().length <= 1 || cnpj.length != 14 || typeof (cnpj) !== "string") {
        return { message: "CNPJ inválido" }
    }

    if (description === null || description === undefined || description.trim() <= 1 || description.length <= 0 || typeof (description) !== "string") {
        return { message: "Descrição inválida" }
    }

    const business = await Business.findOne({
        where: {
            name: name,
            cnpj: cnpj,
        }
    })

    if (business) {
        return { message: "Empresa já cadastrada" }
    } else {
        return await Business.create({
            name: name,
            cnpj: cnpj,
            description: description
        })
    }


}

exports.deleteBusiness = async (data) => {
    try {
        let _id = data.id

        const business = await Business.findOne({ where: { id: _id } })

        if (!business) {
            return { message: "Empresa não encontrada" }
        }

        return Business.destroy({ where: { id: _id } })

    } catch (error) {
        return { message: "Erro ao apagar empresa do banco de dados" }
    }
}

exports.updateBusiness = async (data) => {
    let id = data.id

    try {
        const business = await Business.findOne({ where: { id: id } })

        if (!business) {
            return { message: "Empresa não encontrada no banco de dados" }
        }

        return await Business.update({
            name: data.name,
            cnpj: data.cnpj,
            description: data.description
        }, {
            where: { id: data.id }
        })

    } catch (error) {
        return error
    }
}