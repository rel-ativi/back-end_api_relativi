import { Request, Response } from "express";

import profilesAddFavoritesService from "../../services/profiles/profilesAddFavorites.service";
import profilesListFavoritesService from "../../services/profiles/profilesListFavorites.service";
import profilesUpdateService from "../../services/profiles/profilesUpdate.service";

export const profilesUpdateController = async (req: Request, res: Response) => {
  const { bio, phone } = req.body;
  const update = await profilesUpdateService({ bio, phone });

  return res.status(201).json(update);
};

export const profilesAddFavoritesController = async (
  req: Request,
  res: Response
) => {
  const { profile_id } = req.user;
  const { id } = req.params;

  const favorite = profilesAddFavoritesService(profile_id, id);

  return res.status(201).json(favorite);
};

export const profilesListFavoritesController = async (
  req: Request,
  res: Response
) => {
  const { profile_id } = req.user;

  const list = profilesListFavoritesService(profile_id);

  return res.status(200).json(list);
};
