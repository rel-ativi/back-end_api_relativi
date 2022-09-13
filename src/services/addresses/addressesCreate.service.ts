import AppDataSource from "../../data-source";

import { Address } from "../../entities/addresses.entity";
import { City } from "../../entities/cities.entity";
import { Country } from "../../entities/countries.entity";
import { District } from "../../entities/districts.entity";
import { Profile } from "../../entities/profiles.entity";
import { State } from "../../entities/states.entity";

import { AppError } from "../../errors/AppError";
import { IAddressRequest } from "../../interfaces/adresses";

const addressesCreateService = async (
  profile_id: string,
  {
    street,
    number,
    zip_code,
    district_id,
    city_id,
    state_id,
    country_id,
  }: IAddressRequest
) => {
  const adressessRepo = AppDataSource.getRepository(Address);
  const districtsRepo = AppDataSource.getRepository(District);
  const citiesRepo = AppDataSource.getRepository(City);
  const statesRepo = AppDataSource.getRepository(State);
  const countriesRepo = AppDataSource.getRepository(Country);
  const profilesRepo = AppDataSource.getRepository(Profile);

  const districts = await districtsRepo.find();
  const district = districts.find((dis) => dis.id === district_id);

  const city = await citiesRepo.findOne({ where: { id: city_id } });
  const state = await statesRepo.findOne({ where: { id: state_id } });
  const country = await countriesRepo.findOne({
    where: { id: country_id },
  });
  const profile = await profilesRepo.findOne({
    where: { id: profile_id },
  });

  if (!district) {
    throw new AppError("District not found", 404);
  }

  if (!city) {
    throw new AppError("City not found", 404);
  }

  if (!state) {
    throw new AppError("State not found", 404);
  }

  if (!country) {
    throw new AppError("Country not found", 404);
  }

  const address = new Address();

  address.street = street;
  address.number = number;
  address.zip_code = zip_code;
  address.district = district;
  address.city = city;
  address.state = state;
  address.country = country;
  address.created_by = profile!;

  adressessRepo.create(address);
  await adressessRepo.save(address);

  return address;
};

export default addressesCreateService;
