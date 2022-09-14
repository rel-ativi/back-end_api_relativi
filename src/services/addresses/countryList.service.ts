import AppDataSource from "../../data-source";

import { Country } from "../../entities/countries.entity";

const listCountriesService = async () => {

  const countriesRepository = AppDataSource.getRepository(Country);
  const countries = await countriesRepository.find();

  return countries;
};

export default listCountriesService;