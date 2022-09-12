import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import { admLogin, createBank, notAdmLogin, updateBank, userCreate, userCreateNotAdm } from "../mock"


describe("Update a bank_info", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update a bank_info", async () => {

        await request(app).post("/users").send(userCreate)
        
        await request(app).post("/bank_info").send(updateBank)

        const login = await request(app).post("/login").send(admLogin)

        const bank_info = await request(app).post("/bank_info").send(createBank)

        const response = await request(app).patch(`/bank_info/${bank_info.body.id}`).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                bank: updateBank.bank,
                agency: updateBank.agency,
                account_number: updateBank.account_number
            })
        )
    })
    
    test("Should not be able to update bank_info without authentication", async () => {

        const bank_info = await request(app).post("/bank_info").send(createBank)

        const response = await request(app).patch(`/bank_info/${bank_info.body.id}`).send(createBank)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to update bank_info not being pro_user", async () => {

        await request(app).post("/users").send(userCreateNotAdm)

        const login = await request(app).post("/login").send(notAdmLogin)

        const bank_info = await request(app).post("/bank_info").send(createBank)
        
        const response = await request(app).patch(`/bank_info/${bank_info.body.id}`).set("Authorization", `Bearer ${login.body.token}`)

        
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
})
