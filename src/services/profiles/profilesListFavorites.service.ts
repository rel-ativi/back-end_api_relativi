import AppDataSource from "../../data-source";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";

const profilesListFavoritesService = async (profile_id: string) => {
    const profileRepo = AppDataSource.getRepository(Profile)
    const profiles = await profileRepo.find()
    const profile = profiles.find((prof) => prof.id === profile_id)

    if(!profile) {
        throw new AppError("Profile not found", 404)
    }

    return profile.favorite_activities
}   

export default profilesListFavoritesService