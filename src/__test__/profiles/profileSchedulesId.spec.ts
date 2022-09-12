import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import { admLogin, createSchedules, userCreate } from "../mock"


describe("", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => connection.destroy())

    test("", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        
        const schedules = await request(app).post("/schedules").send(createSchedules).set("Authorization", `Bearer ${login.body.token}`)
        const response = await request(app).post(`/profile/schedules/${schedules.body.id}`).set("Authorization", `Bearer ${login.body.token}`)
    
        expect(response.status).toBe(200)
        
        expect(response.body).toEqual(

            expect.objectContaining({
                id: response.body.id,
                date: schedules.body.schedules,
                hour: response.body.hour,
                activity: response.body.activity,
                profile: response.body.profile
            })
        )
    })
        
    test("Should not be able to view profile schedules without authentication", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        
        const schedules = await request(app).post("/schedules").send(createSchedules).set("Authorization", `Bearer ${login.body.token}`)
        const response = await request(app).patch(`/profile/schedules/${schedules.body.id}`).send(createSchedules)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })

    test("Should not be able to view profile schedules with invalid id", async () => {

        await request(app).post("/users").send(userCreate)

        const login = await request(app).post("/login").send(admLogin)
        
        const response = await request(app).post("/profile/schedules/1").set("Authorization", `Bearer ${login.body.token}`)
    
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
