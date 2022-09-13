import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import {
  ActivityUpdate,
  IActivityRequest,
  IActivitySchedule,
} from "../interfaces/activities";
import { INameNumber, INameOnly } from "../interfaces/generic";

import createActivityService from "../services/activities/createActivity.service";
import createActivityScheduleService from "../services/activities/createActivitySchedule.service";
import createCategoryService from "../services/activities/createCategory.service";
import createDayService from "../services/activities/createDay.service";
import deleteActivityService from "../services/activities/deleteActivity.service";
import deleteActivityScheduleService from "../services/activities/deleteActivitySchedule.service";
import deleteCategoryService from "../services/activities/deleteCategory.service";
import deleteDayService from "../services/activities/deleteDay.service";
import listAllActivitiesService from "../services/activities/listAllActivities.service";
import listCategoriesService from "../services/activities/listCategories.service";
import listDaysService from "../services/activities/listDays.service";
import listUserActivitiesService from "../services/activities/listUserActivities.service";
import updateActivityService from "../services/activities/updateActivity.service";
import updateActivityScheduleService from "../services/activities/updateActivitySchedule.service";

export const createActivityController = async (req: Request, res: Response) => {
  const activityData: IActivityRequest = req.body;
  const profile_id = req.user.profile_id;

  const activity = await createActivityService(profile_id, { ...activityData });

  return res.status(201).json(instanceToPlain(activity));
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

  return res.status(201).json(day);
};

export const createCategoryController = async (req: Request, res: Response) => {
  const categoryData: INameOnly = req.body;

  const category = await createCategoryService({ ...categoryData });

  return res.status(201).json(category);
};

export const listAllActivitiesController = async (
  req: Request,
  res: Response
) => {
  const activities = await listAllActivitiesService();

  return res.json(activities);
};

export const listUserActivitiesController = async (
  req: Request,
  res: Response
) => {
  const profile_id = req.user.profile_id;

  const activities = await listUserActivitiesService(profile_id);

  return res.json(activities);
};

export const listDaysController = async (req: Request, res: Response) => {
  const days = await listDaysService();

  return res.json(days);
};

export const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.json(categories);
};

export const updateActivityController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateData: ActivityUpdate = req.body;

  const updated = await updateActivityService(id, { ...updateData });

  return res.json(updated);
};

export const updateActivityScheduelController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const updateData: IActivitySchedule = req.body;

  const updated = await updateActivityScheduleService(id, { ...updateData });

  return res.json(updated);
};

export const deleteActivityController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteActivityService(id);

  return res.status(204).send();
};

export const deleteActivityScheduleController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  await deleteActivityScheduleService(id);

  return res.status(204).send();
};

export const deleteDayController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteDayService(id);

  return res.status(204).send();
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteCategoryService(id);

  return res.status(204).send();
};
