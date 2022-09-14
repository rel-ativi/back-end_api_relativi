import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import listUsersService from "../../../services/users/listUsers.service"


describe("List users test unit", () => {
    
    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to list users", async () => {

        const result = await listUsersService()

        expect(result).toHaveProperty("map")
    })
})
