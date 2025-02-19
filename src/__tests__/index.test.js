const server = require("../../server")
const request = require("supertest")
const database = require("../config/database")

beforeAll(async () => {
    await database.sync({force:true})
})

afterAll(async ()=>{
    await server.close()
    if (database.close) await database.close()
    
})


describe("Requisições para a rota '/'", () => {
   

    it("Servidor inicia com sucesso", async () => {
        const response = await request(server)
        .get("/")

        expect(response.status).toBe(200)
    })
})

describe("Requisições para a rota '/api/user'", () => {
    it("Cria diferentes usuarios", async () => {
    await request(server)
    .post("/api/user").send({
        name: "Alice Smith",
        password: "a9d4F2g!"
    })
    await request(server)
    .post("/api/user").send({
        name: "Michael Johnson",
        password: "Tg67$#pL"
    })
    await request(server)
    .post("/api/user").send({
        name: "Sophia Brown",
        password: "Zx81!bNp"
    })
    await request(server)
    .post("/api/user").send({
        name: "James Wilson",
        password: "yK34@qWv"
    })
    await request(server)
    .post("/api/user").send({
        name: "Emma Davis",
        password: "Lm52#oXt"
    })


    

    })


    it("Retorna um json com todos os usuarios", async () => {
        const response = await request(server)
        .get("/api/user")

        const users = response.body 

        users.forEach(user => {
            expect(user).toHaveProperty("id")
            expect(user).toHaveProperty("name")
            expect(user).toHaveProperty("password")
        });
    })

    it("Tenta criar um usuario já cadastrao", async () => {
        const reponse = request(server)
        .post("/api/user").send({
            name: "Alice Smith",
            password: "a9d4F2g!"
        })

        expect(response.status).toBe(500)
    })

})