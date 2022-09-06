import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import profilesAddScheduleService from "../../services/profiles/profilesAddSchedule.service";

const profilesAddScheduleController = async (req: Request, res: Response) => {
    try {

    }
    catch(err) {
        if(err instanceof AppError) {
            
        }
    }
}

export default profilesAddScheduleController