import { Request, Response } from "express";

import createScheduleService from "../services/schedules/createSchedule.service";
import listScheduleService from "../services/schedules/listSchedule.service";
import deleteScheduleService from "../services/schedules/deleteSchedule.service";

import { IScheduleRequest } from "../interfaces/profiles";

export const createScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params; //id da activy
  const { profile_id } = req.user; //id do profile
  const { date, hour }: IScheduleRequest = req.body; //provisóriamente será passada uma chave userId na request para pegar o user, por hora

  const schedule = await createScheduleService(id, profile_id, {
    date,
    hour,
  });

  return res.status(201).json(schedule);
};

export const listScheduleController = async (req: Request, res: Response) => {
  const { profile_id } = req.user;

  const schedules = await listScheduleService(profile_id);

  return res.json(schedules);
};

export const deleteScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await deleteScheduleService(id);

  return res.status(204).json({ message: "Schedule deleted" });
};
