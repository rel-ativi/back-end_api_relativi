import request from "supertest"
import app from "../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"


describe("List users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to list users", async () => {

        const response = await request(app).get("/users")

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)
        expect(response.body).toHaveProperty("map")
    })
})
