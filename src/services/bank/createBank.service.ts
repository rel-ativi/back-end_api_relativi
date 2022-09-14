import AppDataSource from "../../data-source";

import { BankInfo } from "../../entities/bank_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import { IBankInfo } from "../../interfaces/bank_info";

const createBankService = async (
  id: string,
  { bank, agency, account_number }: IBankInfo
) => {
  if (!id) {
    throw new AppError("access denied", 404);
  }

  const profilesRepo = AppDataSource.getRepository(Profile);

  const profiles = await profilesRepo.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("user not found");
  }

  if (profile.bank_info) {
    throw new AppError("user already has a bank");
  }

  const banksRepo = AppDataSource.getRepository(BankInfo);

  const newBank = new BankInfo();

  newBank.account_number = account_number;
  newBank.agency = agency;
  newBank.bank = bank;

  banksRepo.create(newBank);
  await banksRepo.save(newBank);

  profilesRepo.update(profile!.id, { bank_info: newBank });

  return newBank;
};

export default createBankService;
