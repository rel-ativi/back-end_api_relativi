import { BankInfo } from "../../entities/bank_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { IBankInfo } from "../../interfaces/bank_info";

const createBankService = async (
  id: string,
  { bank, agency, account_number }: IBankInfo
) => {
  if (!id) {
    throw new AppError("access denied", 404);
  }

  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("user not found");
  }

  if (profile.bank_info) {
    throw new AppError("user already has a bank");
  }

  const bankRepository = AppDataSource.getRepository(BankInfo);

  const banks = await bankRepository.find();

  const newBank = new BankInfo();

  newBank.account_number = account_number;
  newBank.agency = agency;
  newBank.bank = bank;

  bankRepository.create(newBank);
  await bankRepository.save(newBank);

  profileRepository.update(profile!.id, { bank_info: newBank });

  return newBank;
};

export default createBankService;
