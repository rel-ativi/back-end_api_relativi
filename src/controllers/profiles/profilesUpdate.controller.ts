import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import profilesUpdateService from "../../services/profiles/profilesUpdate.service";

const profilesUpdateController = async (req: Request, res: Response) => {
    try {

    }
    catch(err) {
        if(err instanceof AppError) {
            
        }
    }
}

export default profilesUpdateController