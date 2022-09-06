import AppDataSource from "../../data-source";
import { Address } from "../../entities/adresses";
import { Profile } from "../../entities/profiles";
import { AppError } from "../../errors/AppError";
import { IProfile } from "../../interfaces/profiles";


const profilesCreateService = async ({bio, phone}: IProfile) => {
    const profileRepository = AppDataSource.getRepository(Profile)
}

export default profilesCreateService