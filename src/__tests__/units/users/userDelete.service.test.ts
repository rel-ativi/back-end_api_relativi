import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createUserService from "../../../services/users/createUser.service"
import listUsersService from "../../../services/users/listUsers.service"
import { userCreate, userCreateNotAdm } from "../../mock"


describe("Delete a user test unit", () => {
    
    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Must be able to soft delete user", async () => {

        const result = await createUserService(userCreate)

        const findUser = await listUsersService()

        expect(findUser[0].body.is_active).toBe(false)
        expect(result).toHaveProperty("message")
    })

    test("Should not be able to delete user not being admin", async () => {

        const result = await createUserService(userCreateNotAdm)

        expect(result).toHaveProperty("message")
    })
})
