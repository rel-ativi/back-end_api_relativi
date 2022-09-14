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
    throw new AppError("Access denied", 403);
  }

  const profilesRepo = AppDataSource.getRepository(Profile);

  const profiles = await profilesRepo.find();

  const profile = profiles.find((prof) => prof.id === id);

  if (!profile) {
    throw new AppError("Access denied", 403);
  }

  const paymentsRepo = AppDataSource.getRepository(PaymentInfo);

  const payments = await paymentsRepo.find();

  const updatePayment = payments.find(
    (pay) => pay.id === profile.payment_info.id
  );

  if (!updatePayment) {
    throw new AppError("No payment found", 404);
  }

  await paymentsRepo.update(updatePayment.id, {
    card_name: card_name || updatePayment.card_name,
    card: card || updatePayment.card,
    due_date: due_date || updatePayment.due_date,
    sec_code: sec_code || updatePayment.sec_code,
  });

  const updated = await paymentsRepo.findOneBy({ id });

  return updated!;
};

export default updatePaymentService;
