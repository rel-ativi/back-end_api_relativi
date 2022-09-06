import request from "supertest"
import app from "../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import { userCreate } from "../mock"


describe("Delete a user", () => {

    let connection: DataSource

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        response1 = await request(app).post("/users").send(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to delete a user", async () => {

        const response = await request(app).delete(`/users/${response1.body.id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
        expect(response.body.is_active)
    })

    test("Trying to delete a user that doesn't exist", async () => {

        const response = await request(app).delete("/users/1")

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
