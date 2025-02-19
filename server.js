require('dotenv').config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const routes = require("./src/routes")
const indexRoutes = require("./src/routes/index.routes")
const app = express ()
app.use(express.json())
app.use(express.urlencoded({extended: true  }))
app.use(cors())
app.use(morgan("dev"))
app.use("/", indexRoutes)
app.use("/api", routes)
const PORT  = process.env.PORT
let server
 
    server = app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`))

module.exports = server