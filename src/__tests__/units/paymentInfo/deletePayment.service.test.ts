import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createPaymentService from "../../../services/payments/createPayment.service"
import deletePaymentService from "../../../services/payments/deletePayment.service"
import { createPayment } from "../../mock"


describe("Dalete payment test unit", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to delete payment", async () => {

        const paymentDeleted = await createPaymentService("1", createPayment)

        const result = await deletePaymentService(paymentDeleted.id)

        expect(result).toHaveProperty("message")
    })

    test("Should not be able to payment bank with invalid id", async () => {

        const result = await deletePaymentService("id")

        expect(result).toHaveProperty("message")
    })
})
