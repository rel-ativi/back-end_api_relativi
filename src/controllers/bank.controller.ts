import { Request, Response } from "express";
import createBankService from "../services/bank/createBank.service";
import updateBankService from "../services/bank/updateBank.service";
import deleteBankService from "../services/bank/deleteBank.service";

export const createBankController = async (req: Request, res: Response) => {
  const { id, bank, agency, account_number } = req.body;

  const newBank = await createBankService(id, bank, agency, account_number);

  return res.status(201).json(newBank);
};

export const updateBankController = async (req: Request, res: Response) => {
  const { id, bank, agency, account_number } = req.body;

  const updateBank = await updateBankService(id, bank, agency, account_number);

  return res.status(200).json({ message: "Bank updated" });
};

export const deleteBankController = async (req: Request, res: Response) => {
  const { id } = req.body;

  const deleteBank = await deleteBankService(id);

  return res.status(204).json({ message: "Bank deleted!" });
};
