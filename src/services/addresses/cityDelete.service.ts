import AppDataSource from "../../data-source";
import { City } from "../../entities/cities.entity"; 
import { AppError } from "../../errors/AppError";

const deleteCityService = async (id: string) => {

  const cityRepository = AppDataSource.getRepository(City);
  
  const cities = await cityRepository.find();

  const deleteCitiy = cities.find((cit) => cit.id === id);

  if(!deleteCitiy){
      throw new AppError('City does not exist', 404)
  }

  await cityRepository.delete(deleteCitiy)
};

export default deleteCityService;