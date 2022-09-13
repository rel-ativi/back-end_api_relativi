import { PaymentInfo } from "../../entities/payment_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { IPaymentInfo } from "../../interfaces/payment_info";

const createPaymentService = async (
  id: string,
  { card_name, card, due_date, sec_code }: IPaymentInfo
) => {
  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("Profile not found", 404);
  }

  if (profile!.payment_info) {
    throw new AppError("user already has a payment method");
  }

  const paymentInfoRepository = AppDataSource.getRepository(PaymentInfo);

  const payments = await paymentInfoRepository.find();

  const strSecCode = sec_code.toString();
  const strCardNumber = card.toString();

  if (strSecCode.length > 3 || strSecCode.length < 3) {
    throw new AppError("invalid code");
  }

  if (strCardNumber.length < 16 || strCardNumber.length > 16) {
    throw new AppError("Invalid card");
  }

  const payment = new PaymentInfo();

  payment.card_name = card_name;
  payment.card = card;
  payment.due_date = due_date;
  payment.sec_code = sec_code;

  paymentInfoRepository.create(payment);
  await paymentInfoRepository.save(payment);

  profileRepository.update(profile!.id, { payment_info: payment });

  return payment;
};
export default createPaymentService;
