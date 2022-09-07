import request from "supertest"
import app from "../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import { userCreate } from "../mock"


describe("Create a user", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test(" Must be able to create a user", async () => {

        const response = await request(app).post("/users").send(userCreate)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                name: userCreate.name,
                email: userCreate.email,
                is_adm: userCreate.is_adm,
                is_pro_user: userCreate.is_pro_user,
                is_active: response.body.is_active,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at,
                profile_id: response.body.profile_id
            })
        )
    })

    test("Should not be able to create a user that already exists", async () => {

        const response = await request(app).post("/users").send(userCreate)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })
})
