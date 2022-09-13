import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { UserSchedule } from "../../entities/user_schedule.entity";
import { Profile } from "../../entities/profiles.entity";

const listScheduleService = async (id: string) => {
  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  return profile?.scheduled_activities;
};

export default listScheduleService;
