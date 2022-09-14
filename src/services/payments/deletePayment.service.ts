import AppDataSource from "../../data-source";

import { PaymentInfo } from "../../entities/payment_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";

const deletePaymentService = async (id: string) => {
  if (!id) {
    throw new AppError("access denied", 404);
  }

  const profilesRepo = AppDataSource.getRepository(Profile);

  const profiles = await profilesRepo.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("User not found", 404);
  }

  const findPayment = profile!.payment_info.id;

  if (!findPayment) {
    throw new AppError("User does not have a payment method");
  }

  const paymentsRepo = AppDataSource.getRepository(PaymentInfo);

  const payments = await paymentsRepo.find();

  const payment = payments.find((pay) => pay.id === findPayment);

  console.log(payment!.id);

  await paymentsRepo.delete(payment!.id);
};

export default deletePaymentService;
