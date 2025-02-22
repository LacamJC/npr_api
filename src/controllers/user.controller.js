const userService = require("../services/user.service")

exports.getAllUsers = async (req,res) => {
    try {
        const users = await userService.getAllUsers()
        res.json(users)
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

exports.getUserById = async (req,res) => {
    try {
        const user_by_id = await userService.getUserById(req.query)
        res.json(user_by_id)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

exports.getUser = async (req,res) => {
    try {
        const userId = req.query.id 
        if(userId)
        {
            const user = await userService.getUserById(userId)
            res.json(user)
        }else{
            const users = await userService.getAllUsers()
            res.json(users)
        }
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

exports.createUser = async (req,res) => {
    try{
        const new_user = await userService.createUser(req.body)
        res.status(201).json(new_user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteUser = async (req,res) => {
    try{
        const user = await userService.deleteUser(req.body)
        res.status(200).json({message: (user == 1 ?"Usuario deletado com sucesso" :"Usuario inexistente")})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.updateUser = async (req,res) => {
    try{
        const user = await userService.updateUser(req.body)
        res.json(user)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

exports.getCollectionPoints = async(req,res) => {
    try{
        const collectionPoints = await userService.getCollectionPoints(req.query.id)
        res.json(collectionPoints)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
}

exports.verifyUser = async (req,res) => {
    try{
        const user = await userService.verifyUser(req.body)
        res.json(user)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}