import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import { admLogin, createProfile, userCreate } from "../mock"


describe("Create a profile", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create a profile", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        const response = await request(app).post("/profile").send(createProfile).set("Authorization", `Bearer ${login.body.token}`)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                bio: createProfile?.bio,
                phone: createProfile?.phone,
                address: createProfile?.address,
                bank_info: createProfile?.bank_info,
                payment_info_id: response.body?.payment_info_id,
                certifications: response.body?.certifications,
                scheduled_activities: response.body?.scheduled_activities,
                activity_history: response.body?.activity_history,
                favorite_activities: response.body?.favorite_activities
            })
        )
    })
    
    test("Should not be able to create profile without authentication", async () => {

        const response = await request(app).post("/profile").send(createProfile)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})
