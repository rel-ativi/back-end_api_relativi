import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createBankService from "../../../services/bank/createBank.service"
import updateBankService from "../../../services/bank/updateBank.service"
import { createBank, updateBank } from "../../mock"


describe("Update bank test unit", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update bank", async () => {

        const bankUpdated = await createBankService("1", createBank)

        const result = await updateBankService(bankUpdated.id, updateBank)

        expect(result).toHaveProperty("message")
    })

    test("Should not be able to update bank with invalid id", async () => {

        const result = await updateBankService("id", updateBank)

        expect(result).toHaveProperty("message")
    })
})
