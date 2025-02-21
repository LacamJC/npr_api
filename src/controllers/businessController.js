const businessService = require("../services/business.service")

exports.getBusiness = async (req, res) => {
    try {
        const business = await businessService.getAllBusiness()
        res.json(business)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createBusiness = async (req, res) => {
    try {
        const newBusiness = await businessService.create(req.body)
        res.json(newBusiness)
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