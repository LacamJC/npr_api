const express = require("express")
const userController = require("../controllers/user.controller")
const router = express.Router()

router.get("/", userController.getUser)
router.post("/", userController.createUser)
router.delete("/", userController.deleteUser)

module.exports = router