const server = require("../../server")
const request = require("supertest")
const database = require("../config/database")
const { response } = require("express")

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
    it("POST /api/user Cria diferentes usuarios", async () => {
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


    it("GET /api/user Retorna um json com todos os usuarios", async () => {
        const response = await request(server)
        .get("/api/user")

        const users = response.body 

        users.forEach(user => {
            expect(user).toHaveProperty("id")
            expect(user).toHaveProperty("name")
            expect(user).toHaveProperty("password")
        });
    })

    it("POST /api/user Retorna uma mensagem de erro ao tentar cadastra um usuário já existente", async () => {
        await request(server)
        .post("/api/user").send({
            name : "Nome existe",
            password : "123456"
        })

        const response = await request(server)
        .post("/api/user").send({
            name : "Nome existe",
            password : "123456"
        })
        expect(response.body).toHaveProperty('message')



    })

})


describe("Requisições para a rota '/api/business'", () => {
    it("POST /api/business Cria diferentes empresas", async () => {
        await request(server).post("/api/business").send({
            name: "Empresa 1",
            password: "1234567",
            cnpj: "12.345.678/0001-99",
            description: "Empresa de tecnologia focada em soluções web"
        });
        
        await request(server).post("/api/business").send({
            name: "Empresa 2",
            password: "1234567",
            cnpj: "23.456.789/0001-88",
            description: "Consultoria em marketing digital e estratégias online"
        });
        
        await request(server).post("/api/business").send({
            name: "Empresa 3",
            password: "1234567",
            cnpj: "34.567.890/0001-77",
            description: "Serviços de design gráfico e branding para marcas"
        });
        
        await request(server).post("/api/business").send({
            name: "Empresa 4",
            password: "1234567",
            cnpj: "45.678.901/0001-66",
            description: "Agência de viagens e turismo especializada em roteiros personalizados"
        });
        
        const response = await request(server).post("/api/business").send({
            name: "Empresa 5",
            password: "1234567",
            cnpj: "56.789.012/0001-55",
            description: "Fábrica de móveis sob medida para empresas e residências"
        });

        expect(response.status).toBe(201)
        
    })

    it("GET /api/business retorna um json com todas as empresas", async () => {
        
        const response = await request(server).get("/api/business")
        // console.log("##############")
        // console.log(response.status)
        expect(response.status).toBe(200)
    })

    it("POST /api/business impede de criar registros duplicados", async () => {
        await request(server).post("/api/business").send({
            name: "Empresa 4",
            cnpj: "45.678.901/0002-66",
            description: "Agência de viagens e turismo especializada em roteiros personalizados"
        });

        const response = await request(server).post("/api/business").send({
            name: "Empresa 4",
            cnpj: "45.678.901/0002-66",
            description: "Agência de viagens e turismo especializada em roteiros personalizados"
        });

        expect(response.body).toHaveProperty('message')
    })
})