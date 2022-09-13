import AppDataSource from "../../data-source";

import { Address } from "../../entities/addresses.entity";

const listAddressesService = async () => {

  const addressesRepository = AppDataSource.getRepository(Address);
  const addresses = await addressesRepository.find();

  return addresses;
};

export default listAddressesService;