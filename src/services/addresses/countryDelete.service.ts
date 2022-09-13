import AppDataSource from "../../data-source";
import { Country } from "../../entities/countries.entity";
import { AppError } from "../../errors/AppError";

const deleteCountryService = async (id: string) => {

  const countryRepository = AppDataSource.getRepository(Country);
  
  const country = await countryRepository.find();

  const deleteCountry = country.find((coun) => coun.id === id);

  if(!deleteCountry){
      throw new AppError('Country does not exist', 404)
  }

  await countryRepository.delete(deleteCountry)
};

export default deleteCountryService;