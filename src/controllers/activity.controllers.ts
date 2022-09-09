import { Request, Response } from "express";

import { IActivityRequest, IActivitySchedule } from "../interfaces/activities";
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
import listUserActivitiesService from "../services/activities/listUserActivities.service";
import listActivitiesService from "../services/activities/listUserActivities.service";

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

export const listAllActivitiesController = async (
  req: Request,
  res: Response
) => {
  const activities = await listAllActivitiesService();

  return activities;
};

export const listUserActivitiesController = async (
  req: Request,
  res: Response
) => {
  const profile_id = req.user.profile_id;

  const activities = await listUserActivitiesService(profile_id);

  return activities;
};

export const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return categories;
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
