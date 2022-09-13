import request from "supertest"
import app from "../../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import { admLogin, notAdmLogin, userCreate, userCreateNotAdm } from "../../mock"


describe("List users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to list users", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        const response = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("map")
    })
    
    test("Should not be able to list users without authentication", async () => {

        const response = await request(app).get("/users")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to list users not being admin", async () => {

        await request(app).post("/users").send(userCreateNotAdm)

        const login = await request(app).post("/login").send(notAdmLogin)
        const response = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })
})
