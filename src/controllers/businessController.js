const businessService = require("../services/business.service")

exports.getBusiness = async (req, res) => {

    try {
        let id = req.query.id
        if (id) {
            const business = await businessService.getBusinessById(id)
            res.status(200).json(business)
        } else {
            const business = await businessService.getAllBusiness()
            res.status(200).json(business)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


exports.createBusiness = async (req, res) => {
    try {
        const newBusiness = await businessService.create(req.body)


        res.status(201).json(newBusiness)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteBusiness = async (req, res) => {
    try {
        const business = await businessService.deleteBusiness(req.body)
        res.json(business)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateBusiness = async (req, res) => {
    try {
        const business = await businessService.updateBusiness(req.body)
        if (business) {
            res.json({ message: "Dados alterados com sucesso" })
        } else {
            res.json({ message: "Erro, nenhum dado foi alterado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
