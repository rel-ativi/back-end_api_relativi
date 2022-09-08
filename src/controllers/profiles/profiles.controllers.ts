import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import profilesAddScheduleService from "../../services/profiles/profilesAddSchedule.service";
import profilesListScheduleService from "../../services/profiles/profilesListSchedule.service";
import profilesUpdateService from "../../services/profiles/profilesUpdate.service";

export const profilesUpdateController = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    if (err instanceof AppError) {
    }
  }
};

export const profilesAddScheduleController = async (
  req: Request,
  res: Response
) => {
  try {
  } catch (err) {
    if (err instanceof AppError) {
    }
  }
};

export const profilesListScheduleController = async (
  req: Request,
  res: Response
) => {
  try {
  } catch (err) {
    if (err instanceof AppError) {
    }
  }
};
