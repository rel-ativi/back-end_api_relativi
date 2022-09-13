import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { AppError } from "../errors/AppError";
import { IAddressRequest } from "../interfaces/adresses";
import { INameOnly } from "../interfaces/generic";
import addressesCreateService from "../services/addresses/addressesCreate.service";
import createCityService from "../services/addresses/cityCreate.service";
import createDistrictService from "../services/addresses/districtCreate.service";

export const addressesCreateController = async (
  req: Request,
  res: Response
) => {
  const addressData: IAddressRequest = req.body;
  const profile_id = req.user.profile_id;

  const address = await addressesCreateService(profile_id, { ...addressData });

  return res.status(201).json(instanceToPlain(address));
};

export const districtCreateController = async (req: Request, res: Response) => {
  const districtData: INameOnly = req.body;

  const district = await createDistrictService({ ...districtData });

  return res.status(201).json(district);
};

export const cityCreateController = async (req: Request, res: Response) => {
  const cityData: INameOnly = req.body;

  const city = await createCityService({ ...cityData });

  return res.status(201).json(city);
};

export const addressesDeleteController = async (
  req: Request,
  res: Response
) => {
  try {
  } catch (error) {
    if (error instanceof AppError) {
    }
  }
};

export const addressesUpdateController = async (
  req: Request,
  res: Response
) => {
  try {
  } catch (error) {
    if (error instanceof AppError) {
    }
  }
};
