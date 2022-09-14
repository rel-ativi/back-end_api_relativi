import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { Profile } from "../../entities/profiles.entity";

const listUserAdressesService = async (
  profile_id: string
): Promise<Address[]> => {
  const addressesRepo = AppDataSource.getRepository(Address);
  const profilesRepo = AppDataSource.getRepository(Profile);

  const addresses = await addressesRepo.find();
  const profile = await profilesRepo.findOne({ where: { id: profile_id } });

  const usersAddresses = addresses.filter((add) => add.created_by === profile);

  return usersAddresses;
};

export default listUserAdressesService;
