import AppDataSource from "../../data-source";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import { IProfile } from "../../interfaces/profiles";

const profilesUpdateService = async (
  profile_id: string,
  { bio, phone }: IProfile
) => {
  const profileRepo = AppDataSource.getRepository(Profile);
  const profiles = await profileRepo.find();

  const profile = profiles.find((prof) => prof.id === profile_id);

  if (!profile) {
    throw new AppError("Profile does not exists", 404);
  }

  const newBio = bio ? bio : profile.bio;
  const newPhone = phone ? phone : profile.phone;

  const update = {
    ...profile,
    newBio,
    newPhone,
  };

  await profileRepo.save(update);

  return update;
};

export default profilesUpdateService;
