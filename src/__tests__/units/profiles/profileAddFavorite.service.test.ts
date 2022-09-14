import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import { createSchedules } from "../../mock"
import createScheduleService from "../../../services/schedules/createSchedule.service"
import profilesAddFavoritesService from "../../../services/profiles/profilesAddFavorites.service"


describe("Add favorite profile test unit", () => {
    
    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to add favorite profile", async () => {

        const schedule = await createScheduleService(createSchedules)

        const result = await profilesAddFavoritesService(schedule.profile.id, schedule.activity.id)

        expect(result).toHaveProperty("map")
    })
    
    test("Should not be able to add favorite profile that already exists", async () => {

        const schedule = await createScheduleService(createSchedules)

        await profilesAddFavoritesService(schedule.profile.id, schedule.activity.id)

        const result = await profilesAddFavoritesService(schedule.profile.id, schedule.activity.id)

        expect(result).toHaveProperty("message")
    })
    
    test("Should not be able to add favorite profile with invalid profile_id or activity_id", async () => {

        const result = await profilesAddFavoritesService("1", "1")

        expect(result).toHaveProperty("message")
    })
})
