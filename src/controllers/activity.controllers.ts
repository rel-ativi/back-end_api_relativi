import { Request, Response } from "express";

import { IActivityRequest, IActivitySchedule } from "../interfaces/activities";

import createActivityService from "../services/activities/createActivity.service";
import createActivityScheduleService from "../services/activities/createActivitySchedule.service";

export const createActivityController = async (req: Request, res: Response) => {
  const activityData: IActivityRequest = req.body;

  const activity = await createActivityService({ ...activityData });

  return res.status(201).json(activity);
};

export const createActivityScheduleController = async (
  req: Request,
  res: Response
) => {
  const activityScheduleData: IActivitySchedule = req.body;
  const activity = req.params;

  const schedule = await createActivityScheduleService(activity.id, {
    ...activityScheduleData,
  });

  if (schedule) {
    return res.status(201).json({ message: "Schedule created" });
  }
};
