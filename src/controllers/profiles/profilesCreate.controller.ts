import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import profilesCreateService from "../../services/profiles/profilesCreate.service";

const profilesCreateController = async (req: Request, res: Response) => {
    try {

    }
    catch(err) {
        if(err instanceof AppError) {
            
        }
    }
}

export default profilesCreateController