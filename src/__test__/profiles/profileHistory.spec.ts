import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import { admLogin, userCreate } from "../mock"


describe("Profile history list", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to list profile history", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        const response = await request(app).get("/profile/history").set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("map")
    })

    test("Should not be able to list profile history without authentication", async () => {

        const response = await request(app).get("/profile/history")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})
