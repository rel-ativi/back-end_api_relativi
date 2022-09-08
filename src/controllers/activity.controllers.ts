import { Request, Response } from "express";

import { IActivityRequest, IActivitySchedule } from "../interfaces/activities";
import { INameNumber, INameOnly } from "../interfaces/generic";

import createActivityService from "../services/activities/createActivity.service";
import createActivityScheduleService from "../services/activities/createActivitySchedule.service";
import createCategoryService from "../services/activities/createCategory.service";
import createDayService from "../services/activities/createDay.service";

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

export const createDayController = async (req: Request, res: Response) => {
  const dayData: INameNumber = req.body;

  const day = await createDayService({ ...dayData });

  if (day) {
    return res.status(201).json({ message: "Day created" });
  }
};

export const createCategoryController = async (req: Request, res: Response) => {
  const categoryData: INameOnly = req.body;

  const category = await createCategoryService({ ...categoryData });

  if (category) {
    return res.status(201).json({ message: "Category created" });
  }
};
