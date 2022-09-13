import AppDataSource from "../../data-source";

import { City } from "../../entities/cities.entity";
import { AppError } from "../../errors/AppError";
import { INameOnly } from "../../interfaces/generic";

const createCityService = async ({
  name,
}: INameOnly): Promise<City> => {

  const cityRepository = AppDataSource.getRepository(City);

  const cities = await cityRepository.find();

  const cityAlreadyExists = cities.find((cit) => cit.name === name);

  if (cityAlreadyExists) {
    throw new AppError("City already registered");
  }

  const city = new City();
  city.name = name;

  cityRepository.create(cities);

  await cityRepository.save(cities);

  return city;
};

export default createCityService;