const {User} = require("../models/assosiations")

exports.getAllUsers = async () => {
    return await User.findAll()
}

exports.getUserById = async (id) => {
    return await User.findOne({where : {id : id}})
}

exports.createUser = async (data) => {
    const {name, password} = data

    if(name.length < 4 || name == undefined || name == null || typeof(name) !== "string" || name.trim().length < 1)
    {
        return {message: "Usuário inválido, o usuario deve ter pelo menos 4 caracteres"}
    }

    if(password.length < 6 || password == undefined || password == null  || typeof(password) !== "string" || password.trim().length < 1)
    { 
        return {message: "A senha deve ter pelo menos 6 caracteres"}
    }
    try{
        const newUser = await User.create({
            name : name,
            password: password
        })
        return newUser
    }catch(err){
        console.log("Erro ao criar usuario: " + err)
        throw new Error("Erro ao criar usuario")
    }

 }