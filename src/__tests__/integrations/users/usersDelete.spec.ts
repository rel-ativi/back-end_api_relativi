import request from "supertest"
import app from "../../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import { admLogin, notAdmLogin, userCreate, userCreateNotAdm } from "../../mock"


describe("Delete a user", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Must be able to soft delete user", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        const userDeleted = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        const response = await request(app).delete(`/users/${userDeleted.body.id}`).set("Authorization", `Bearer ${login.body.token}`)
        const findUser = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(200)
        expect(findUser.body[0].is_active).toBe(false)
        expect(response.body).toHaveProperty("message")
    })

    test("Shouldn't be able to delete user with isActive = false", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        const userDeleted = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        const response = await request(app).delete(`/users/${userDeleted.body.id}`).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to delete user without authentication", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        const userDeleted = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        const response = await request(app).delete(`/users/${userDeleted.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to delete user not being admin", async () => {

        await request(app).post("/users").send(userCreateNotAdm)

        const login = await request(app).post("/login").send(notAdmLogin)
        const userDeleted = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        const response = await request(app).delete(`/users/${userDeleted.body.id}`).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to delete user with invalid id", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)

        const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
