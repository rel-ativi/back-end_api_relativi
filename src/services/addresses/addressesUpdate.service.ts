import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { City } from "../../entities/cities.entity";
import { Country } from "../../entities/countries.entity";
import { District } from "../../entities/districts.entity";
import { State } from "../../entities/states.entity";
import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/adresses";

const addressesUpdateService = async ({street, number, zip_code, district_id, city_id, state_id, country_id}: IAddressRequest) => {
    
    const addressesRepository = AppDataSource.getRepository(Address);
    const citiesRepository = AppDataSource.getRepository(City);
    const countriesRepository = AppDataSource.getRepository(Country);
    const districtsRepository = AppDataSource.getRepository(District);
    const statesRepository = AppDataSource.getRepository(State);

    const addresses = await addressesRepository.find();
    const cities = await citiesRepository.find();
    const countries = await countriesRepository.find();
    const districts = await districtsRepository.find();
    const states = await statesRepository.find();

    const toUpdate = 
    
    
};

export default addressesUpdateService;