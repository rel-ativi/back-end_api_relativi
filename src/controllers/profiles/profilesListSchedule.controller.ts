import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import profilesListScheduleService from "../../services/profiles/profilesListSchedule.service";

const profilesListScheduleController = async (req: Request, res: Response) => {
    try {

    }
    catch(err) {
        if(err instanceof AppError) {
            
        }
    }
}

export default profilesListScheduleController