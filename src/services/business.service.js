const { Business } = require("../models/assosiations")
const { validateName, validatePassword, validateDescription, validateCNPJ } = require("../utils/validations")
const { businessExists } = require("../utils/verify")
const { createHashPassword } = require("../utils/security") 
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
    const { name, password, cnpj, description } = data


    const nameError = validateName(name)
    if (nameError) {
        return nameError.message
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
        return passwordError.message
    }
    const hashedPassword = await createHashPassword(password)



    const cnpjError = validateCNPJ(cnpj)
    if (cnpjError) {
        return cnpjError.message
    }

    const descriptionError = validateDescription(description)
    if (descriptionError) {
        return descriptionError.message
    }

    const exists = await businessExists(cnpj)
    if (exists) {
        return { message: "Empresa já cadastrada" }
    }
    try {
        const newBusiness = await Business.create({
            name: name,
            password: hashedPassword,
            cnpj: cnpj,
            description: description
        })

        return newBusiness
    } catch (err) {
        console.log("Erro ao criar nova empresa")
        throw new Error("Erro ao criar empresa")
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