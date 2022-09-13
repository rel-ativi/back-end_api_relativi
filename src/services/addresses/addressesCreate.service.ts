import AppDataSource from "../../data-source";

import { Address } from "../../entities/addresses.entity";

import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/adresses";


const addressesCreateService = async ({street, number, zip_code, district_id, city_id, state_id, country_id}: IAddressRequest) => {

    const addressesRepository = AppDataSource.getRepository(Address);


};

export default addressesCreateService;