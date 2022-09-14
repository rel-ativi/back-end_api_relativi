import AppDataSource from "../../data-source";

import { Address } from "../../entities/addresses.entity";
import { City } from "../../entities/cities.entity";
import { Country } from "../../entities/countries.entity";
import { District } from "../../entities/districts.entity";
import { Profile } from "../../entities/profiles.entity";
import { State } from "../../entities/states.entity";
import { AppError } from "../../errors/AppError";
import { IAddressUpdate } from "../../interfaces/adresses";

const addressesUpdateService = async (
  id: string,
  profile_id: string,
  is_adm: boolean,
  {
    street,
    number,
    zip_code,
    district_id,
    city_id,
    state_id,
    country_id,
  }: IAddressUpdate
): Promise<Address> => {
  const addressesRepo = AppDataSource.getRepository(Address);
  const citiesRepo = AppDataSource.getRepository(City);
  const countriesRepo = AppDataSource.getRepository(Country);
  const districtsRepo = AppDataSource.getRepository(District);
  const statesRepo = AppDataSource.getRepository(State);
  const profilesRepo = AppDataSource.getRepository(Profile);

  const addresses = await addressesRepo.find();
  const districts = await districtsRepo.find();

  const toUpdate = addresses.find((add) => add.id === id);
  const district = districts.find((dis) => dis.id === district_id);

  const city = await citiesRepo.findOne({ where: { id: city_id } });
  const state = await statesRepo.findOne({ where: { id: state_id } });
  const country = await countriesRepo.findOne({
    where: { id: country_id },
  });
  const profile = await profilesRepo.findOne({
    where: { id: profile_id },
  });

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  if (!toUpdate) {
    throw new AppError("Address not found", 404);
  }

  if (!!district && !district) {
    throw new AppError("District not found", 404);
  }

  if (!!city_id && !city) {
    throw new AppError("City not found", 404);
  }

  if (!!state_id && !state) {
    throw new AppError("State not found", 404);
  }

  if (!!country_id && !country) {
    throw new AppError("Country not found", 404);
  }

  let is_owner = false;

  profile.addresses.forEach((add) => {
    if (add.id === toUpdate.id) is_owner = true;
  });

  if (!is_owner && !is_adm) {
    throw new AppError("Access denied", 403);
  }

  await addressesRepo.update(id, {
    street: street || toUpdate.street,
    number: number || toUpdate.number,
    zip_code: zip_code || toUpdate.zip_code,
    district: district || toUpdate.district,
    city: city || toUpdate.city,
    state: state || toUpdate.state,
    country: country || toUpdate.country,
  });

  const updated = await addressesRepo.findOneBy({ id });

  return updated!;
};

export default addressesUpdateService;
