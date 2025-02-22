const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const CollectionPoint = require("./CollectionPoint")

const Business = sequelize.define("Business", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cnpj: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})



module.exports = Business