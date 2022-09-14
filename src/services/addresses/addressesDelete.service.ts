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

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  if (!deleteAddress) {
    throw new AppError("Address does not exist", 404);
  }

  let is_owner = false;

  profile.addresses.forEach((add) => {
    if (add.id === deleteAddress.id) is_owner = true;
  });

  if (!is_owner && !is_adm) {
    throw new AppError("Access denied", 403);
  }

  if (profile.address.id === deleteAddress.id) {
    await profilesRepo.update(profile_id, {
      address: { id: undefined },
    });

    await addressesRepo.delete(deleteAddress);
  }
};

export default addressesDeleteService;
