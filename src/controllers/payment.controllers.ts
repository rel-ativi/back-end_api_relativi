import { Request, Response } from "express";
import createPaymentService from "../services/payments/createPayment.service";
import updatePaymentService from "../services/payments/updatePayment.service";
import deletePaymentService from "../services/payments/deletePayment.service";
import { profile } from "console";
import { IPaymentInfo } from "../interfaces/payment_info";
import { IPaymentInfoUpdate } from "../interfaces/payment_info";
export const createPaymentController = async (req: Request, res: Response) => {
  const { profile_id } = req.user;

  const { card_name, card, due_date, sec_code }: IPaymentInfo = req.body;

  const payment = await createPaymentService(profile_id, {
    card_name,
    card,
    due_date,
    sec_code,
  });

  return res.status(201).json(payment);
};

export const updatePaymentController = async (req: Request, res: Response) => {
  const { card_name, card, due_date, sec_code }: IPaymentInfoUpdate = req.body;

  const { profile_id } = req.user;

  const newPayment = await updatePaymentService(profile_id, {
    card_name,
    card,
    due_date,
    sec_code,
  });

  return res.status(200).json({ message: "Payment updated" });
};

export const deletePaymentController = async (req: Request, res: Response) => {
  const { profile_id } = req.user;

  const payment = await deletePaymentService(profile_id);

  return res.status(204).json({ message: "payment deleted" });
};
