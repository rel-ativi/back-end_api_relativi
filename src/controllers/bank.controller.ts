import { Request, Response } from "express";
import createBankService from "../services/bank/createBank.service";
import updateBankService from "../services/bank/updateBank.service";
import deleteBankService from "../services/bank/deleteBank.service";

import { IBankInfo } from "../interfaces/bank_info";
import { IBankInfoUpdate } from "../interfaces/bank_info";

export const createBankController = async (req: Request, res: Response) => {
  const { bank, agency, account_number }: IBankInfo = req.body;

  const { profile_id } = req.user;

  const newBank = await createBankService(profile_id, {
    bank,
    agency,
    account_number,
  });

  return res.status(201).json(newBank);
};

export const updateBankController = async (req: Request, res: Response) => {
  const { bank, agency, account_number }: IBankInfoUpdate = req.body;

  const { profile_id } = req.user;

  const updateBank = await updateBankService(profile_id, {
    bank,
    agency,
    account_number,
  });

  return res.status(200).json({ message: "Bank updated" });
};

export const deleteBankController = async (req: Request, res: Response) => {
  const { profile_id } = req.user;

  const deleteBank = await deleteBankService(profile_id);

  return res.status(204).json({ message: "Bank deleted!" });
};
