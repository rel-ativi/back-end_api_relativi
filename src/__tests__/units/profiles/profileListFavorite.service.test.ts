// import { DataSource } from "typeorm"
// import AppDataSource from "../../../data-source"
// import profilesListFavoritesService from "../../../services/profiles/profilesListFavorites.service"
// import { createSchedules } from "../../mock"
// import createScheduleService from "../../../services/schedules/createSchedule.service"

// describe("View favorite profile test unit", () => {

//     let connection: DataSource

//     beforeAll(async () => {

//         await AppDataSource.initialize()
//         .then(res => connection = res)
//         .catch(err => console.error("Error during Data Source initialization", err))
//     })

//     afterAll(async () => await connection.destroy())

//     test("Trying to view favorite profile", async () => {

//         const schedule = await createScheduleService(createSchedules)

//         const result = await profilesListFavoritesService(schedule.profile.id)

//         expect(result).toHaveProperty("map")
//     })

//     test("Should not be able to view favorite profile that already exists", async () => {

//         const schedule = await createScheduleService(createSchedules)

//         await profilesListFavoritesService(schedule.profile.id)

//         const result = await profilesListFavoritesService(schedule.profile.id)

//         expect(result).toHaveProperty("message")
//     })

//     test("Should not be able to view favorite profile with invalid id", async () => {

//         const result = await profilesListFavoritesService("id")

//         expect(result).toHaveProperty("message")
//     })
// })
