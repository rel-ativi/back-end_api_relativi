import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createUserService from "../../../services/users/createUser.service"
import { userCreate } from "../../mock"


describe("Create a user test unit", () => {
    
    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Must be able to create a user", async () => {

        const result = await createUserService(userCreate)

        expect(result).toHaveProperty("id")
        expect(result).toHaveProperty("password")
        expect(result.password).not.toBe(userCreate.password)
    })
    
    test("Should not be able to create a user that already exists", async () => {

        await createUserService(userCreate)

        const result = await createUserService(userCreate)

        expect(result).toHaveProperty("message")
    })
})
