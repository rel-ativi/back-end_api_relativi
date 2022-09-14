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
    throw new AppError("Access denied", 403);
  }

  const profilesRepo = AppDataSource.getRepository(Profile);

  const profiles = await profilesRepo.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("Access denied", 403);
  }

  const banksRepo = AppDataSource.getRepository(BankInfo);

  const banks = await banksRepo.find();

  const updateBank = banks.find((ban) => ban.id === profile.bank_info.id);

  if (!updateBank) {
    throw new AppError("No bank found", 404);
  }

  await banksRepo.update(updateBank.id, {
    bank: bank || updateBank.bank,
    agency: agency || updateBank.agency,
    account_number: account_number || updateBank.agency,
  });

  const updated = await banksRepo.findOneBy({ id: updateBank.id });

  return updated!;
};

export default updateBankService;
