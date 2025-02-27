const Business = require("../models/Business")

exports.validatePassword = (password) => {
    if (password.length < 6 || password == undefined || password == null || typeof (password) !== "string" || password.trim().length < 1) {
        return { message: "A senha deve ter pelo menos 6 caracteres" }
    }

    if (password.length < 6 || password.trim().length < 6) {
        return { message: "A senha deve conter pelo menos 6 caracteres" }
    }

    if (password === undefined || password === null) {
        return { message: "A senha não pode ser nula" }
    }

    if (typeof (password) !== "string") {
        return { message: "A senha deve ser uma STRING" }
    }

    return null

}

exports.validateName = (name) => {

    if (name === undefined || name === null) {
        return { message: "O nome não pode ser nulo" }
    }

    if (typeof (name) !== "string" || !isNaN(Number(name))) {
        return { message: "O nome deve ser do tipo STRING" }
    }

    if (name.trim().length < 1) {
        return { message: "Nome deve conter pelo menos 2 caracteres" }
    }
    return null
}

exports.validateDescription = (description) => {
    if(description === null || description === undefined)
    {
        return {message: "A descrição não pode ser nula"}
    }

    if(description.length < 1 || description.trim() < 1)
    {
        return {message: "A descrição não pode ser vazia"}
    }

    if(typeof(description) !== "string" || !isNaN(Number(description))){
        return {message: "A descrição deve ser uma STRING"}
    }

    return null
}

exports.validateCNPJ = (cnpj) => {
    if (cnpj === undefined || cnpj === null) {
        return { message: "O nome não pode ser nulo" }
    }

    if (typeof (cnpj) !== "string" || !isNaN(Number(cnpj))) {
        return { message: "O CNPJ deve ser do tipo STRING" }
    }

    if (cnpj.trim().length != 14) {
        return { message: "CNPJ INVÁLIDO" }
    }
}

exports.validateEmail = (email) => {
    if(email === null || email === undefined)
        {
            return {message: "O email não pode ser nula"}
        }
    
        if(email.length < 1 || email.trim() < 1)
        {
            return {message: "O email não pode ser vazia"}
        }
    
        if(typeof(email) !== "string" || !isNaN(Number(email))){
            return {message: "O email deve ser uma STRING"}
        }

        return null
    
}