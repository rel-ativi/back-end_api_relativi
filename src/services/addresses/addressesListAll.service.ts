import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";

const listAllAddressesService = async () => {
  const adressesRepo = AppDataSource.getRepository(Address);
  const adresses = await adressesRepo.find();

  return adresses;
};

export default listAllAddressesService;
