import AppDataSource from "../../data-source";

import { Address } from "../../entities/addresses.entity";
import { City } from "../../entities/cities.entity";
import { Country } from "../../entities/countries.entity";
import { District } from "../../entities/districts.entity";
import { State } from "../../entities/states.entity";

import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/adresses";


const addressesCreateService = async ({street, number, zip_code, district_id, city_id, state_id, country_id}: IAddressRequest) => {

    const addressesRepository = AppDataSource.getRepository(Address);
    const citiesRepository = AppDataSource.getRepository(City);
    const countriesRepository = AppDataSource.getRepository(Country);
    const districtsRepository = AppDataSource.getRepository(District);
    const statesRepository = AppDataSource.getRepository(State);


    const districts = await districtsRepository.find();

    const district = districts.find((dis) => dis.id === district_id);

    const city = await citiesRepository.findOne({where: {id: city_id}});

    const state = await statesRepository.findOne({where: {id: state_id}});

    const country = await countriesRepository.findOne({where: {id: country_id}});
    

    if (!district) {
        throw new AppError("District not found", 404);
    };

    if (!city) {
        throw new AppError("City not found", 404);
    };

    if (!state) {
        throw new AppError("State not found", 404);
    };

    if (!country) {
        throw new AppError("Country not found", 404);
    };

    const address = new Address();

    address.street = street;
    address.number = number;
    address.zip_code = zip_code;
    address.district = district;
    address.city = city;
    address.state = state;
    address.country = country;

    addressesRepository.create(address);
    await addressesRepository.save(address);

    return address;
};

export default addressesCreateService;