import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import addressesDeleteService from "../../services/addresses/addressesDelete.service";


const addressesDeleteController =async (req:Request, res:Response) => {
    
    try{

        
    } catch(error){

        if(error instanceof AppError){


        }
    }   
};

export default addressesDeleteController;