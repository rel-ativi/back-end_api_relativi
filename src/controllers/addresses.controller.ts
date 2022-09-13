import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IAddressRequest, IAddressUpdate } from "../interfaces/adresses";
import { INameOnly } from "../interfaces/generic";
import addressesCreateService from "../services/addresses/addressesCreate.service";
import addressesDeleteService from "../services/addresses/addressesDelete.service";
import listAllAddressesService from "../services/addresses/addressesListAll.service";
import listUserAdressesService from "../services/addresses/addressesListUser.service";
import addressesUpdateService from "../services/addresses/addressesUpdate.service";
import createCityService from "../services/addresses/cityCreate.service";
import deleteCityService from "../services/addresses/cityDelete.service";
import listCitiesService from "../services/addresses/cityList.service";
import createCountryService from "../services/addresses/countryCreate.service";
import deleteCountryService from "../services/addresses/countryDelete.service";
import listCountriesService from "../services/addresses/countryList.service";
import createDistrictService from "../services/addresses/districtCreate.service";
import deleteDistrictService from "../services/addresses/districtDelete.service";
import listDistrictsService from "../services/addresses/districtList.service";
import createStateService from "../services/addresses/stateCreate.service";
import deleteStatetService from "../services/addresses/stateDelete.service";
import listStatesService from "../services/addresses/stateList.service";

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

export const stateCreateController = async (req: Request, res: Response) => {
  const stateData: INameOnly = req.body;

  const state = await createStateService({ ...stateData });

  return res.status(201).json(state);
};

export const countryCreateController = async (req: Request, res: Response) => {
  const countryData: INameOnly = req.body;

  const coutnry = await createCountryService({ ...countryData });

  return res.status(201).json(coutnry);
};

export const listAllAddressesController = async (
  req: Request,
  res: Response
) => {
  const adresses = await listAllAddressesService();

  return res.json(adresses);
};

export const listUserAddressesController = async (
  req: Request,
  res: Response
) => {
  const profile_id = req.user.profile_id;

  const activities = await listUserAdressesService(profile_id);

  return res.json(activities);
};

export const listDistrictsController = async (req: Request, res: Response) => {
  const districts = await listDistrictsService();

  return res.json(districts);
};

export const listCitiesController = async (req: Request, res: Response) => {
  const cities = await listCitiesService();

  return res.json(cities);
};

export const listStatesController = async (req: Request, res: Response) => {
  const states = await listStatesService();

  return res.json(states);
};

export const listCountriesController = async (req: Request, res: Response) => {
  const country = await listCountriesService();

  return res.json(country);
};

export const addressesUpdateController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const profile_id = req.user.profile_id;
  const is_adm = req.user.is_adm;

  const addressData: IAddressUpdate = req.body;

  const updated = await addressesUpdateService(id, profile_id, is_adm, {
    ...addressData,
  });
  return res.json(instanceToPlain(updated));
};

export const addressDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const profile_id = req.user.profile_id;
  const is_adm = req.user.is_adm;

  await addressesDeleteService(id, profile_id, is_adm);

  return res.status(204).send();
};

export const deleteDistrictController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteDistrictService(id);

  return res.status(204).send();
};
export const deleteCityController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteCityService(id);

  return res.status(204).send();
};
export const deleteStateController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteStatetService(id);

  return res.status(204).send();
};
export const deleteCountryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteCountryService(id);

  return res.status(204).send();
};
