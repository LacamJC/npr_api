const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: "mysql",
//   port: 3306,
//   logging: false,
// });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: false,
    }
    );


sequelize.authenticate()
  .then(() => console.log("🔥 Conectado ao banco de dados!"))
  .catch((err) => console.error("Erro ao conectar:", err));

module.exports = sequelize;