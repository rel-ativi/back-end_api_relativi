import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import AppDataSource from "../../data-source"
import { admLogin, notAdmLogin, userCreate } from "../mock"


describe("Logging in", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("", err))
    })

    afterAll(async () => await connection.destroy())

    test("Should be able to login with the user", async () => {

        await request(app).post("/users").send(userCreate)

        const response = await request(app).post("/login").send(admLogin)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
    })

    test("Should not be able to login with the user with incorrect password or email", async () => {

        const response = await request(app).post("/login").send(notAdmLogin)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
})
