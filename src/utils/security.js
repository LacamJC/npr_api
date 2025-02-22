const bcrypt = require("bcrypt")

exports.createHashPassword = async (password) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword
}

exports.comparePassword = async (password, hashedPassword) => {
    
    const status = isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(status)
    return  status




}