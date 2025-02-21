const collectionPointService = require("../services/collectionPoint.service")

exports.getCollectionPoint = async (req, res) => {
    try {
        let type = req.query.type

        if (type) {
            console.log("PONTOS ESPECIFICOS")
            const collectionPoint = await collectionPointService.getCollectionPointByType(req.query)
            res.json(collectionPoint)
        } else {
            console.log("PONTOS NAO ESPECIFICOS")

            const collectionPoint = await collectionPointService.getAllCollectionPoints()
            res.json(collectionPoint)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.createCollectionPoint = async (req, res) => {
    try {
        const newCollectionPoint = await collectionPointService.createCollectionPoint(req.body)
        res.json(newCollectionPoint)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}