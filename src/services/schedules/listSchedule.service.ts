import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { UserSchedule } from "../../entities/user_schedule.entity";
import { Profile } from "../../entities/profiles.entity";
import { User } from "../../entities/users.entity";
const listScheduleService = async (profile_id: string) => {
  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === profile_id);

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  if (profile.scheduled_activities.length === 0) {
    throw new AppError("There are no scheduled activities");
  }

  return profile.scheduled_activities;
};

export default listScheduleService;
