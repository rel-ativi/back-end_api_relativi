import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createBankService from "../../../services/bank/createBank.service"
import deleteBankService from "../../../services/bank/deleteBank.service"
import { createBank } from "../../mock"


describe("Dalete bank test unit", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to delete bank", async () => {

        const bankDeleted = await createBankService("1", createBank)

        const result = await deleteBankService(bankDeleted.id)

        expect(result).toHaveProperty("message")
    })

    test("Should not be able to delete bank with invalid id", async () => {

        const result = await deleteBankService("id")

        expect(result).toHaveProperty("message")
    })
})
