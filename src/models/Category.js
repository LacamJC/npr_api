const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")


const Category = sequelize.define("Category", { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// sequelize.sync()
// .then(()=>{
//     return Promise.all([
//         Category.create({name : "Orgânico"}),
//         Category.create({name : "Reciclável"}),
//         Category.create({name : "Não reciclável"}),
//         Category.create({name : "Eletrônico"}),
//         Category.create({name : "Industrial"}),
//     ])
//     .then(newCategories => {
//         console.log("Categorias criadas: ", newCategories.map(cat => cat.toJSON()))
//     })
//     .catch(err => {
//         console.error("Erro ao criar categorias: " + err)
//     })
    
// })



// Category.sync({force:true})

module.exports = Category