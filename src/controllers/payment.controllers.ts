import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IPaymentInfo, IPaymentInfoUpdate } from "../interfaces/payment_info";

import createPaymentService from "../services/payments/createPayment.service";
import deletePaymentService from "../services/payments/deletePayment.service";
import updatePaymentService from "../services/payments/updatePayment.service";

export const createPaymentController = async (req: Request, res: Response) => {
  const { profile_id } = req.user;

  const payemntData: IPaymentInfo = req.body;

  const payment = await createPaymentService(profile_id, { ...payemntData });

  return res.status(201).json(instanceToPlain(payment));
};

export const updatePaymentController = async (req: Request, res: Response) => {
  const paymentData: IPaymentInfoUpdate = req.body;

  const { profile_id } = req.user;

  const updatedPayment = await updatePaymentService(profile_id, {
    ...paymentData,
  });

  return res.status(200).json(instanceToPlain(updatedPayment));
};

export const deletePaymentController = async (req: Request, res: Response) => {
  const { profile_id } = req.user;

  await deletePaymentService(profile_id);

  return res.status(204).json();
};
