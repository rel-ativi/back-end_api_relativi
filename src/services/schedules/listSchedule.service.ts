import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { UserSchedule } from "../../entities/user_schedule.entity";
import { Profile } from "../../entities/profiles.entity";
import { User } from "../../entities/users.entity";
const listScheduleService = async (id: string) => {
  // const scheduleRepository = AppDataSource.getMongoRepository(UserSchedule);

  // const schedules = await scheduleRepository.find();

  // const schedule = schedules.filter((sche) => sche.profile.id === id);

  // if (!schedule) {
  //   throw new AppError("schedules not found", 404);
  // }

  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  return profile?.scheduled_activities;
};

export default listScheduleService;
