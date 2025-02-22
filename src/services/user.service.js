const { User, CollectionPoint } = require("../models/assosiations")
const { validatePassword, validateName } = require("../utils/validations")
const { userExists } = require("../utils/verify")
const bcrypt = require("bcrypt")

exports.getCollectionPoints = async (id) => {
    return CollectionPoint.findAll({ where: { id_user: id } })
}

exports.getAllUsers = async () => {
    return await User.findAll()
}

exports.getUserById = async (id) => {
    return await User.findOne({ where: { id: id } })
}

exports.createUser = async (data) => {
    const { name, password } = data

    const passwordError = validatePassword(password)
    if (passwordError) {
        return passwordError.message
    }
    const hashedPassword = await bcrypt.hash(password, 10)

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
        password: data.password
    }

    try {
        const user = await User.findOne({ where: { id: data_user.id } })

        if (!user) {
            return { message: "Usuário não encontrado no banco de dados" }
        }

        await User.update({
            name: data_user.name,
            password: data_user.password
        }, {
            where: { id: data_user.id }
        })

        return { message: "Usuário atualizado com sucesso" }
    } catch (error) {
        return { message: "Erro ao atualizar dados do usuário" }
    }
}

