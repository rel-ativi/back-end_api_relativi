import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { BankInfo } from "../../entities/bank_info.entity";
import { IBankInfoUpdate } from "../../interfaces/bank_info";
const updateBankService = async (
  id: string,
  { bank, agency, account_number }: IBankInfoUpdate
) => {
  if (!id) {
    throw new AppError("access denied", 404);
  }

  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("log into your account to make changes");
  }

  if (!profile.bank_info) {
    throw new AppError("no registered bank!");
  }

  const bankRepository = AppDataSource.getRepository(BankInfo);

  const banks = await bankRepository.find();

  const updateBank = banks.find((bk) => bk.id === profile!.bank_info.id);

  bank ? (updateBank!.bank = bank) : updateBank!.bank;
  agency ? (updateBank!.agency = agency) : updateBank!.agency;
  account_number
    ? (updateBank!.account_number = account_number)
    : updateBank!.account_number;

  await bankRepository.update(updateBank!.id, {
    bank: bank,
    agency: agency,
    account_number: account_number,
  });

  return true;
};

export default updateBankService;
