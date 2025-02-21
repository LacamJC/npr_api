const { CollectionPoint, Category } = require("../models/assosiations")

exports.getAllCollectionPoints = async () => {
    return await CollectionPoint.findAll()
}

exports.getCollectionPointByType = async (data) => {
    const _id = Number(data.type)

    // const category = _category.name

    // return await CollectionPoint.findAll({
    //     where: { id_category: 2 },
    //     include: {
    //         model: Category,
    //         as: "category",
            
            
    //     }
    // })

    return await CollectionPoint.findAll({
        where : {id_category : _id}
    })

    // return id
}

exports.createCollectionPoint = async (data) => {
    const { name, business_name, cep, score, id_user, id_business, id_category } = data
    var collectionPoint = {
        name: name,
        business_name: business_name,
        cep: cep,
        score: score,
        id_user: id_user,
        id_business: id_business,
        id_category: id_category
    }

    if (id_business.length <= 0 || typeof (id_business) !== "number" || id_business == undefined) {
        collectionPoint.id_business = null
    }

    if (name == null || cep == undefined || name.length <= 0 || typeof (name) !== "string" || name.trim().length < 1) {
        return { message: "Nome do ponto inválido" }
    }

    if (cep == null || cep == undefined || cep.length < 8 || typeof (cep) !== "string" || cep.trim().length < 1) {
        return { message: "CEP inválido" }
    }




    const new_collectionPoint = await CollectionPoint.create({
        name: collectionPoint.name,
        business_name: collectionPoint.business_name,
        cep: collectionPoint.cep,
        score: collectionPoint.score,
        id_user: collectionPoint.id_user,
        id_business: collectionPoint.id_business,
        id_category: collectionPoint.id_category
    })

    return new_collectionPoint
}