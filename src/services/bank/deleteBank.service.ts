import AppDataSource from "../../data-source";

import { BankInfo } from "../../entities/bank_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";

const deleteBankService = async (id: string) => {
  if (!id) {
    throw new AppError("Access denied", 404);
  }

  const profilesRepo = AppDataSource.getRepository(Profile);

  const profiles = await profilesRepo.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("User not found", 404);
  }

  const findBank = profile.bank_info.id;

  if (!findBank) {
    throw new AppError("User does not have a bank");
  }

  const bankRepository = AppDataSource.getRepository(BankInfo);

  const banks = await bankRepository.find();

  const deleteBank = banks.find((bk) => bk.id === findBank);

  await bankRepository.delete(deleteBank!.id);
};

export default deleteBankService;
