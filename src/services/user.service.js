const { User } = require("../models/assosiations")

exports.getAllUsers = async () => {
    return await User.findAll()
}

exports.getUserById = async (id) => {
    return await User.findOne({ where: { id: id } })
}

exports.createUser = async (data) => {
    const { name, password } = data
    let valid = true
    await User.findOne({
        where: {
            name: name,
            password: password,
        }
    })
        .then((user) => {
            if (user) {
                console.log("USUARIO JA CADASTRADO")
                valid = false
            }
        })
        .catch(err => {
            console.log("Erro ao verficiar se usuario ja e cadastrado")
        })

    if (!valid) {
        return { message: "Usuário já cadastrado" }
    }

    if (name.length < 4 || name == undefined || name == null || typeof (name) !== "string" || name.trim().length < 1) {
        return { message: "Usuário inválido, o usuario deve ter pelo menos 4 caracteres" }
    }

    if (password.length < 6 || password == undefined || password == null || typeof (password) !== "string" || password.trim().length < 1) {
        return { message: "A senha deve ter pelo menos 6 caracteres" }
    }
    try {
        const newUser = await User.create({
            name: name,
            password: password
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

