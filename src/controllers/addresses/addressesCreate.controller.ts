import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import addressesCreateService from "../../services/addresses/addressesCreate.service";


const addressesCreateController =async (req:Request, res:Response) => {
    
    try{

        const {street, number, zip_code, district_id, city_id, state_id, country_id} = req.body;

        const adress = await addressesCreateService({street, number, zip_code, district_id, city_id, state_id, country_id})
    } catch(error){

        if(error instanceof AppError){


        }
    }   
};

export default addressesCreateController;