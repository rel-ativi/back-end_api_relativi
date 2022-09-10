import { Request, Response } from "express";
import createPaymentService from "../services/payments/createPayment.service";
import updatePaymentService from "../services/payments/updatePayment.service";
import deletePaymentService from "../services/payments/deletePayment.service";

export const createPaymentController = async (req: Request, res: Response) => {
  // const {id} = req.headers.authorization

  const { id, card_name, card, due_date, sec_code } = req.body;

  const payment = await createPaymentService(
    id,
    card_name,
    card,
    due_date,
    sec_code
  );

  return res.status(201).json(payment);
};

export const updatePaymentController = async (req: Request, res: Response) => {
  const { id, card_name, card, due_date, sec_code } = req.body;

  const newPayment = await updatePaymentService(
    id,
    card_name,
    card,
    due_date,
    sec_code
  );

  return res.status(200).json({ message: "Payment updated" });
};

export const deletePaymentController = async (req: Request, res: Response) => {
  const { id } = req.body;

  console.log(id, "1: id recebido da requisição");

  const payment = await deletePaymentService(id);

  return res.status(204).json({ message: "payment deleted" });
};
