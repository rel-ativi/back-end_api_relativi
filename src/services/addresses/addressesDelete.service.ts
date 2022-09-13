import AppDataSource from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";

const addressesDeleteService = async (
  id: string,
  profile_id: string,
  is_adm: boolean
) => {
  const addressesRepo = AppDataSource.getRepository(Address);
  const profilesRepo = AppDataSource.getRepository(Profile);

  const addresses = await addressesRepo.find();

  const deleteAddress = addresses.find((address) => address.id === id);

  const profile = await profilesRepo.findOne({
    where: { id: profile_id },
  });

  if (!deleteAddress) {
    throw new AppError("Address does not exist", 404);
  }

  if (!(deleteAddress.created_by === profile!) && !is_adm) {
    throw new AppError("Access denied", 403);
  }

  const parent = deleteAddress.address_of;

  if (!(parent instanceof Profile)) {
    throw new AppError("Can not delete activity address", 400);
  }

  await profilesRepo.update(id, {
    address: { id: undefined },
  });

  await addressesRepo.delete(deleteAddress);
};

export default addressesDeleteService;
