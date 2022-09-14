import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import { createSchedules, updateProfile } from "../../mock"
import createScheduleService from "../../../services/schedules/createSchedule.service"
import profilesUpdateService from "../../../services/profiles/profilesUpdate.service"


describe("Update profile test unit", () => {
    
    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update profile", async () => {

        const schedule = await createScheduleService(createSchedules)

        const result = await profilesUpdateService(schedule.profile.id, updateProfile)

        expect(result).toHaveProperty("message")
    })
    
    test("Should not be able to update profile with invalid id", async () => {

        const result = await profilesUpdateService("id", updateProfile)

        expect(result).toHaveProperty("message")
    })
})
