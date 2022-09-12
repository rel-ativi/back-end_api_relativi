import request from "supertest"
import app from "../../app"
import AppDataSource from "../../data-source"
import { DataSource } from "typeorm"
import { admLogin, createPayment, userCreate } from "../mock"


describe("Create a payment", () => {

    let connection: DataSource

    beforeAll(async () => {
        
        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create a payment", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)

        const response = await request(app).post("/payment_info").send(createPayment).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                card: createPayment.card,
                card_name: createPayment.card_name,
                due_date: createPayment.due_date,
                sec_code: createPayment.sec_code
            })
        )
    })

    test("Should not be able to create payment without authentication", async () => {

        const response = await request(app).post("/payment_info").send(createPayment)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})
