const server = require("../../server")
const request = require("supertest")
const database = require("../config/database")
afterAll(async ()=>{
    await server.close()
    if (database.close) await database.close()
    
})


describe("Testes de servido", () => {
   

    it("Servidor inicia com sucesso", async () => {
        const response = await request(server)
        .get("/")

        expect(response.status).toBe(200)
    })
})