const {User, Business} = require("../models/assosiations")

exports.userExists = async (name) => {
    try {
        const user = await User.findOne({
            where: {
                name: name,
            }
        })

        return !!user
    } catch (error) {
        
        console.log(error)
        return {message: "Erro interno do servidor"}
    }
}

exports.businessExists = async(cnpj) => {
    try{
        const business = await Business.findOne({
            where: {
                cnpj : cnpj
            }
        })

        return !!business
    }catch(error){
        console.log(error)
        return {message:"Erro interno do servidor"}
    }
}