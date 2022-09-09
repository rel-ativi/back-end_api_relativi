import AppDataSource from "../../data-source";
import { Activity } from "../../entities/activities.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";

const profilesAddFavoritesService = async (profile_id: string, activity_id: string) => {
    const profileRepo = AppDataSource.getRepository(Profile)
    const activityRepo = AppDataSource.getRepository(Activity)

    const profiles = await profileRepo.find()
    const activities = await activityRepo.find()

    const profile = profiles.find((prof) => prof.id === profile_id)
    const findActivity = activities.find((act) => act.id === activity_id)

    if(!profile) {
        throw new AppError("Profile not found", 404)
    }

    if(!findActivity) {
        throw new AppError("Activity not found", 404)
    }

   const activity = profile.favorite_activities.find(act => act.id === activity_id)
 
    if(activity) {
        profile.favorite_activities = profile.favorite_activities.filter((act) => {
            return act.id !== activity.id
        })

        return {message: "Activity removed succesfully"}
    }
    else {
        profile.favorite_activities = [...profile.favorite_activities, findActivity]
        await profileRepo.save(profile)

        return {message: "Activity added succesfully"}
    }
}   

export default profilesAddFavoritesService