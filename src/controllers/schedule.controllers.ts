import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUserScheduleRequest } from "../interfaces/profiles";

import createScheduleService from "../services/schedules/createSchedule.service";
import deleteScheduleService from "../services/schedules/deleteSchedule.service";
import listScheduleService from "../services/schedules/listSchedule.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const date: IUserScheduleRequest = req.body;
  const { profile_id } = req.user;

  const schedule = await createScheduleService(id, profile_id, date);

  return res.status(201).json(instanceToPlain(schedule));
};

export const listScheduleController = async (req: Request, res: Response) => {
  const { profile_id } = req.user;

  const schedules = await listScheduleService(profile_id);

  return res.json(instanceToPlain(schedules));
};

export const deleteScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteScheduleService(id);

  return res.status(204).send();
};
