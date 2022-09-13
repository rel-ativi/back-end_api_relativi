import AppDataSource from "../../data-source";

import { District } from "../../entities/districts.entity";
import { AppError } from "../../errors/AppError";
import { INameOnly } from "../../interfaces/generic";

const createDistrictService = async ({name,}: INameOnly): Promise<District> => {

  const districtRepository = AppDataSource.getRepository(District);

  const districts = await districtRepository.find();

  const districtAlreadyExists = districts.find((dis) => dis.name === name);

  if (districtAlreadyExists) {
    throw new AppError("District already registered");
  }

  const district = new District();
  district.name = name;

  districtRepository.create(district);

  await districtRepository.save(district);

  return district;
};

export default createDistrictService;