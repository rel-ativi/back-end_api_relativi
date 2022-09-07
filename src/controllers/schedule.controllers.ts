import { Request, Response } from "express";

import createScheduleService from "../services/createSchedule.service";

export const createScheduleController = async (req: Request, res: Response) => {
  const { activityId } = req.params;
  const { userId, date, hour } = req.body; //provisóriamente será passada uma chave userId na request para pegar o user, por hora

  console.log(activityId, "1.1: id de atividade recebido pelo params");
  console.log(userId, date, hour, "1.2 parâmetros passados pelo body");

  const schedule = await createScheduleService({
    activityId,
    userId,
    date,
    hour,
  });

  console.log(schedule, "5: schedule recebido do service");

  return res.status(201).json(schedule);
};
