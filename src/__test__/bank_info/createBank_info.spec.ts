import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import { admLogin, createBank, notAdmLogin, userCreate, userCreateNotAdm } from "../mock"


describe("Create a bank_info", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create a bank_info", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)

        const response = await request(app).post("/bank_info").send(createBank).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                bank: createBank.agency,
                agency: createBank.agency,
                account_number: createBank.account_number
            })
        )
    })
    
    test("Should not be able to create bank_info without authentication", async () => {

        const response = await request(app).post("/bank_info").send(createBank)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to create bank_info not being pro_user", async () => {

        await request(app).post("/users").send(userCreateNotAdm)

        const login = await request(app).post("/login").send(notAdmLogin)
        
        const response = await request(app).post("/bank_info").set("Authorization", `Bearer ${login.body.token}`)

        
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
})
