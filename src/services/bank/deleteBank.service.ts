import { BankInfo } from "../../entities/bank_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";

const deleteBankService = async (id: string) => {
  if (!id) {
    throw new AppError("access denied", 404);
  }

  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("user not found", 404);
  }

  const findBank = profile.bank_info.id;

  if (!findBank) {
    throw new AppError("user does not have a bank");
  }

  await profileRepository.update(id, {
    bank_info: {
      id: undefined,
    },
  });

  const bankRepository = AppDataSource.getRepository(BankInfo);

  const banks = await bankRepository.find();

  const deleteBank = banks.find((bk) => bk.id === findBank);

  await bankRepository.delete(deleteBank!.id);

  return true;
};

export default deleteBankService;
