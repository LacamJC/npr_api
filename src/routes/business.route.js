const express = require("express")
const businessController = require("../controllers/businessController")

const router = express.Router()

router.get("/", businessController.getBusiness)
router.post("/", businessController.createBusiness)
router.delete("/", businessController.deleteBusiness)

module.exports = router