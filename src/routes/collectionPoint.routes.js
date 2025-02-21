const express = require("express")
const collectionPointController = require("../controllers/collectionPointController")

const router = express.Router()

router.get("/", collectionPointController.getCollectionPoint)
router.post("/", collectionPointController.createCollectionPoint)


module.exports = router
