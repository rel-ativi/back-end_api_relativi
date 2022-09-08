import { Request, Response } from "express";

import { IActivityRequest } from "../interfaces/activities";

import createActivityService from "../services/activities/createActivity.service";

export const createActivityController = async (req: Request, res: Response) => {
  const activityData: IActivityRequest = req.body;

  const activity = await createActivityService({ ...activityData });

  return res.status(201).json(activity);
};
