import AppDataSource from "../../data-source";

import { Country } from "../../entities/countries.entity";
import { AppError } from "../../errors/AppError";
import { INameOnly } from "../../interfaces/generic";

const createCountryService = async ({name,}: INameOnly): Promise<Country> => {

  const countryRepository = AppDataSource.getRepository(Country);

  const countries = await countryRepository.find();

  const countryAlreadyExists = countries.find((cout) => cout.name === name);

  if (countryAlreadyExists) {
    throw new AppError("Country already registered");
  }

  const country = new Country();
  country.name = name;

  countryRepository.create(countries);

  await countryRepository.save(countries);

  return country;
};

export default createCountryService;