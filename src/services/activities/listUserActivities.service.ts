import AppDataSource from "../../data-source";

import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";

const listUserActivitiesService = async (profile_id: string) => {
  const profileRepo = AppDataSource.getRepository(Profile);
  const profiles = await profileRepo.find();

  const profile = profiles.find((pro) => pro.id === profile_id);

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  if (profile.activities.length === 0) {
    throw new AppError("No activities found", 404);
  }

  return profile.activities;
};

export default listUserActivitiesService;
