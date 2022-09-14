import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createPaymentService from "../../../services/payments/createPayment.service"
import { createPayment } from "../../mock"


describe("Create payment test unit", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create payment", async () => {

        const result = await createPaymentService("1", createPayment)

        expect(result).toHaveProperty("id")
    })

    test("Should not be able to create payment with invalid id", async () => {

        const result = await createPaymentService("id", createPayment)

        expect(result).toHaveProperty("message")
    })
})
