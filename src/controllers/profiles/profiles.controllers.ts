import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { handleErrorMiddleware } from "../../middlewares/handleError.middleware";
import profilesUpdateService from "../../services/profiles/profilesUpdate.service";

export const profilesUpdateController = async (req: Request, res: Response) => {
  const { bio, phone } = req.body;
  const update = await profilesUpdateService({ bio, phone });

  return res.status(201).json(update);
};

export const profilesAddFavoritesController = async (req: Request, res: Response) => {

}

export const profilesListFavoritesController = async (req: Request, res: Response) => {
  
}