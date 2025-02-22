const { User, CollectionPoint } = require("../models/assosiations")
const { validatePassword, validateName } = require("../utils/validations")
const { userExists } = require("../utils/verify")
const { createHashPassword, comparePassword } = require("../utils/security")
const { compare } = require("bcrypt")

exports.getCollectionPoints = async (id) => {
    return CollectionPoint.findAll({ where: { id_user: id } })
}

exports.getAllUsers = async () => {
    return await User.findAll()
}

exports.getUserById = async (id) => {
    return await User.findOne({ where: { id: id } })
}

exports.getUserByEmail = async (email) => {
    return await User.findOne({where : {email : email}})
}

exports.createUser = async (data) => {
    const { name, password, email } = data

    const passwordError = validatePassword(password)
    if (passwordError) {
        return passwordError.message
    }
    const hashedPassword = await createHashPassword(password)

    const nameError = validateName(name)
    if (nameError) {
        return nameError.message
    }

    const exists = await userExists(name)
    if(exists)
    {
        return {message: "Usuário já cadastrado"}
    }

    try {
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        return newUser
    } catch (err) {
        console.log("Erro ao criar usuario: " + err)
        throw new Error("Erro ao criar usuario")
    }

}

exports.deleteUser = async (data) => {
    const { id } = data
    return await User.destroy({ where: { id: id } })

}

exports.updateUser = async (data) => {
    const data_user = {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password
    }

    try {
        const user = await User.findOne({ where: { id: data_user.id } })

        if (!user) {
            return { message: "Usuário não encontrado no banco de dados" }
        }

        await User.update({
            name: data_user.name,
            password: data_user.password,
            email: data_user.email
        }, {
            where: { id: data_user.id }
        })

        return { message: "Usuário atualizado com sucesso" }
    } catch (error) {
        return { message: "Erro ao atualizar dados do usuário" }
    }
}

exports.verifyUser = async (data) => {
    const {email, password} = data

    const exists = await userExists(email)
    if(!exists){
        return {message: "Usuário não encontrado no banco de dados"}
    }

    const user = await User.findOne({where :{email : email}})

    const isTheSame = await comparePassword(password, user.password)
    console.log(isTheSame)
    if(isTheSame){

        return {message: "Senha correta", loginCorrect : true}
    }else{
        return {message: "Email ou Senha inválidos"}
    }

}