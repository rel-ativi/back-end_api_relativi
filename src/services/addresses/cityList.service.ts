import AppDataSource from "../../data-source";

import { City } from "../../entities/cities.entity";

const listCitiesService = async () => {

  const citiesRepository = AppDataSource.getRepository(City);
  const cities = await citiesRepository.find();

  return cities;
};

export default listCitiesService;