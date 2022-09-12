import request from "supertest"
import app from "../../app"
import AppDataSource from "../../data-source"
import { DataSource } from "typeorm"
import { admLogin, createPayment, userCreate } from "../mock"


describe("Update a payment", () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update a payment", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)

        const payment_info = await request(app).post("/payment_info").send(createPayment)

        const response = await request(app).patch(`/payment_info/${payment_info.body.id}`).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to update payment without authentication", async () => {

        const payment_info = await request(app).post("/payment_info").send(createPayment)

        const response = await request(app).patch(`/payment_info/${payment_info.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})
