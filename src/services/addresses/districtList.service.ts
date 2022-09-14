import AppDataSource from "../../data-source";

import { District } from "../../entities/districts.entity";

const listDistrictsService = async () => {

  const districtiesRepository = AppDataSource.getRepository(District);
  const districtie = await districtiesRepository.find();

  return districtie;
};

export default listDistrictsService;