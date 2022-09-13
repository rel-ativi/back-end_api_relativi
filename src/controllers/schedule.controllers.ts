import { Request, Response } from "express";

import createScheduleService from "../services/schedules/createSchedule.service";
import listScheduleService from "../services/schedules/listSchedule.service";
import deleteScheduleService from "../services/schedules/deleteSchedule.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const { activityId } = req.params;
  const { userId, date, hour } = req.body; //provisóriamente será passada uma chave userId na request para pegar o user, por hora

  const schedule = await createScheduleService({
    activityId,
    userId,
    date,
    hour,
  });

  return res.status(201).json(schedule);
};

export const listScheduleController = async (req: Request, res: Response) => {
  const { id } = req.body;

  console.log(id, "1:o id recebido");

  const schedules = await listScheduleService(id);

  return res.json(schedules);
};

export const deleteScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await deleteScheduleService(id);

  return res.status(204).json({ message: "Schedule deleted" });
};
