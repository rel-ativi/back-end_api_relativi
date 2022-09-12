import request from "supertest"
import app from "../../app"
import AppDataSource from "../../data-source"
import { DataSource } from "typeorm"
import { admLogin, createProfile, updateProfile, userCreate } from "../mock"


describe("Update a profile", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => connection.destroy())

    test("Trying to update profile", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)

        const responseUpdate = await request(app).patch("/profile").send(updateProfile).set("Authorization", `Bearer ${login.body.token}`)

        const response = await request(app).post("/profile").send(createProfile).set("Authorization", `Bearer ${login.body.token}`)


        expect(responseUpdate.status).toBe(200)
        expect(responseUpdate.body).toHaveProperty("message")
        
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                bio: responseUpdate?.body.bio,
                phone: responseUpdate?.body.phone,
                address: responseUpdate.body?.address,
                bank_info: responseUpdate.body?.bank_info,
                payment_info_id: responseUpdate.body?.payment_info_id,
                certifications: response.body?.certifications,
                scheduled_activities: response.body?.scheduled_activities,
                activity_history: response.body?.activity_history,
                favorite_activities: response.body?.favorite_activities
            })
        )
    })
        
    test("Should not be able to update profile without authentication", async () => {

        const response = await request(app).patch("/profile").send(updateProfile)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})
