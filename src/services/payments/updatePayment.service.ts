import { PaymentInfo } from "../../entities/payment_info.entity";
import { Profile } from "../../entities/profiles.entity";
import { AppError } from "../../errors/AppError";
import AppDataSource from "../../data-source";
import { IPaymentInfoUpdate } from "../../interfaces/payment_info";
const updatePaymentService = async (
  id: string,
  { card_name, card, due_date, sec_code }: IPaymentInfoUpdate
) => {
  if (!id) {
    throw new AppError("user not logged in");
  }

  const profileRepository = AppDataSource.getRepository(Profile);

  const profiles = await profileRepository.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("access denied", 404);
  }

  const findPayment = profile.payment_info.id;

  if (!findPayment) {
    throw new AppError("this account does not have a payment method");
  }

  const paymentRepository = AppDataSource.getRepository(PaymentInfo);

  const payments = await paymentRepository.find();

  const payment = payments.find((pay) => pay.id === findPayment);

  card_name ? (payment!.card_name = card_name) : payment!.card_name;
  card ? (payment!.card = card) : payment!.card;
  due_date ? (payment!.due_date = due_date) : payment!.due_date;
  sec_code ? (payment!.sec_code = sec_code) : payment!.sec_code;

  await paymentRepository.update(payment!.id, {
    card_name: card_name,
    card: card,
    due_date: due_date,
    sec_code: sec_code,
  });

  return true;
};

export default updatePaymentService;
