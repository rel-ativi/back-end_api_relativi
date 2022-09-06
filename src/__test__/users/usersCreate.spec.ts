import request from "supertest"
import app from "../../app"
import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import { userCreate } from "../mock"


describe("Create an user", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("", async () => {

        const response = await request(app).post("/users").send(userCreate)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                name: userCreate.name,
                email: userCreate.email,
                is_pro_user: userCreate.is_pro_user,
                is_active: userCreate.is_active,
                is_adm: userCreate.is_adm,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at,
                profile_id: response.body.profile_id
            })
        )
    })
})
