import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import createPaymentService from "../../../services/payments/createPayment.service"
import updatePaymentService from "../../../services/payments/updatePayment.service"
import { createPayment, updatePayment } from "../../mock"


describe("Update payment test unit", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update payment", async () => {

        const paymentUpdated = await createPaymentService("1", createPayment)

        const result = await updatePaymentService(paymentUpdated.id, updatePayment)

        expect(result).toHaveProperty("message")
    })

    test("Should not be able to update payment with invalid id", async () => {

        const result = await updatePaymentService("id", updatePayment)

        expect(result).toHaveProperty("message")
    })
})
