import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createBankService from "../../../services/bank/createBank.service"
import { createBank } from "../../mock"


describe("Create bank test unit", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create bank", async () => {

        const result = await createBankService("1", createBank)

        expect(result).toHaveProperty("id")
    })

    test("Should not be able to create bank with invalid id", async () => {

        const result = await createBankService("id", createBank)

        expect(result).toHaveProperty("message")
    })
})
