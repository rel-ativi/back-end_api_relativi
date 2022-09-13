import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import newSessionService from "../../../services/session/newSession.service"
import { admLogin, notAdmLogin } from "../../mock"


describe("Logging in", () => {
    
    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Should be able to login with the user", async () => {

        const result = await newSessionService(admLogin)

        expect(result).toBe(200)
        expect(result).toHaveProperty("token")
    })
    
    test("Should not be able to login with the user with incorrect password or email", async () => {

        const result = await newSessionService(notAdmLogin)

        expect(result).toBe(403)
        expect(result).toHaveProperty("message")
    })
})
