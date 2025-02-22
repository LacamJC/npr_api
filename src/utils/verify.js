const {User, Business} = require("../models/assosiations")

exports.userExists = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email: email,
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