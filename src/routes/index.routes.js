const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    res.send("Documentação em <a href='https://github.com/LacamJC/npr_api' target='_blank'>https://github.com/LacamJC/npr_api</a>")
})

module.exports = router