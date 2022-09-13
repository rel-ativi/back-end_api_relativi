import { PaymentInfo } from "../../entities/payment_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";

const deletePaymentService = async (id: string) => {
  if (!id) {
    throw new AppError("access denied", 404);
  }

  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("user not found", 404);
  }

  const findPayment = profile!.payment_info.id;

  if (!findPayment) {
    throw new AppError("user does not have a payment method");
  }

  const paymentRepository = AppDataSource.getRepository(PaymentInfo);

  const payments = await paymentRepository.find();

  const payment = payments.find((pay) => pay.id === findPayment);

  console.log(payment!.id);

  await paymentRepository.delete(payment!.id);

  return true;
};

export default deletePaymentService;
