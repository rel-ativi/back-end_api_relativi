import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import { admLogin, createProfile, userCreate } from "../mock"


describe("View favorite profile", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => connection.destroy())

    test("Trying to view favorite profile", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        
        const profile = await request(app).post("/profile").send(createProfile).set("Authorization", `Bearer ${login.body.token}`)
        const response = await request(app).post(`/profile/favorite/${profile.body.id}`).set("Authorization", `Bearer ${login.body.token}`)
    
        expect(response.status).toBe(200)
        
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
    
    test("Should not be able to view profile favorite without authentication", async () => {
        
        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        
        const profile = await request(app).post("/profile").send(createProfile).set("Authorization", `Bearer ${login.body.token}`)
        const response = await request(app).post(`/profile/favorite/${profile.body.id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to view favorite profile with invalid id", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        
        const response = await request(app).post("/profile/favorite/1").set("Authorization", `Bearer ${login.body.token}`)
    
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
