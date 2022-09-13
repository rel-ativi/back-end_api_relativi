import { Request, Response } from "express";
import { AppError } from "../errors/AppError";
import addressesCreateService from "../services/addresses/addressesCreate.service";
import addressesDeleteService from "../services/addresses/addressesDelete.service";
import addressesUpdateService from "../services/addresses/addressesUpdate.service";

export const addressesCreateController = async (req:Request, res:Response) => {
    
    try{

        const {street, number, zip_code, district_id, city_id, state_id, country_id} = req.body;

        const address = await addressesCreateService({street, number, zip_code, district_id, city_id, state_id, country_id});
        
    } catch(error){

        if(error instanceof AppError){


        }
    }   
};

export const addressesDeleteController = async (req:Request, res:Response) => {
    
    try{

        
    } catch(error){

        if(error instanceof AppError){


        }
    }   
};

export const addressesUpdateController = async (req:Request, res:Response) => {
    
    try{

        
    } catch(error){

        if(error instanceof AppError){


        }
    }   
};