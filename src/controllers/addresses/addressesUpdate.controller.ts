import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import addressesUpdateService from "../../services/addresses/addressesUpdate.service";


const addressesUpdateController =async (req:Request, res:Response) => {
    
    try{

        
    } catch(error){

        if(error instanceof AppError){


        }
    }   
};

export default addressesUpdateController;