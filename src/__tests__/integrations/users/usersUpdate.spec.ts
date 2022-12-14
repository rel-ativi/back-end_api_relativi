import request from "supertest"
import app from "../../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import { admLogin, notAdmLogin, userCreate, userCreateNotAdm, userUpdate } from "../../mock"


describe("Update a user", () => {

    let connection: DataSource

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        response1 = await request(app).post("/users").send(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update a user", async () => {

        const responseUpdate = await request(app).patch(`/users/${response1.body.id}`).send(userUpdate)

        const response = await request(app).get(`/users/${response1.body.id}`)

        expect(responseUpdate.status).toBe(200)
        expect(responseUpdate.body).toHaveProperty("message")

        expect(response.body).toEqual(
            
            expect.objectContaining({
                id: response.body.id,
                name: userCreate.name,
                email: userCreate.email,
                password: userCreate.password,
                is_adm: userCreate.is_adm,
                is_pro_user: userCreate.is_pro_user,
                is_active: response.body.is_active,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at,
                profile_id: response.body.profile_id
            })
        )
    })

    test("Trying to update a user that doesn't exist", async () => {
        
        const response = await request(app).patch("/users/1")
    
        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty("message")
    })
    
    test("Shouldn't be able to update user with isActive = false", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        const userUpdated = await request(app).get("/users").set("Authorization", `Bearer ${login.body.token}`)

        const response = await request(app).patch(`/users/${userUpdated.body.id}`).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to update user without authentication", async () => {

        const response = await request(app).patch(`/users/${response1.body.id}`).send(userUpdate)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to update user not being admin", async () => {

        await request(app).post("/users").send(userCreateNotAdm)

        const login = await request(app).post("/login").send(notAdmLogin)
        const response = await request(app).patch(`/users/${response1.body.id}`).send(userUpdate).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to update user with invalid id", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)

        const response = await request(app).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).send(userUpdate).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
