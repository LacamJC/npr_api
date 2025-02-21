const express = require("express")
const collectionPointController = require("../controllers/collectionPointController")

const router = express.Router()

router.get("/", collectionPointController.getCollectionPoint)
router.post("/", collectionPointController.createCollectionPoint)
router.delete("/", collectionPointController.deleteCollectionPoint)


module.exports = router
