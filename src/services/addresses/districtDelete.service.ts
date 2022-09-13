import AppDataSource from "../../data-source";
import { District } from "../../entities/districts.entity";
import { AppError } from "../../errors/AppError";

const deleteDistrictService = async (id: string) => {

  const districtRepository = AppDataSource.getRepository(District);
  
  const district = await districtRepository.find();

  const deleteDistrict = district.find((dis) => dis.id === id);

  if(!deleteDistrict){
      throw new AppError('District does not exist', 404)
  }

  await districtRepository.delete(deleteDistrict)
};

export default deleteDistrictService;