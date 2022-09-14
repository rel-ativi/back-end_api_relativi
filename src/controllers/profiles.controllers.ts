import { Request, Response } from "express";

import profilesAddFavoritesService from "../services/profiles/profilesAddFavorites.service";
import profilesListFavoritesService from "../services/profiles/profilesListFavorites.service";
import profilesUpdateService from "../services/profiles/profilesUpdate.service";

export const profilesUpdateController = async (req: Request, res: Response) => {
  const { bio, phone } = req.body;
  const { profile_id } = req.user;
  const update = await profilesUpdateService(profile_id, { bio, phone });

  return res.status(201).json(update);
};

export const profilesAddFavoritesController = async (
  req: Request,
  res: Response
) => {
  const { profile_id } = req.user;
  const { id } = req.params;

  const favorites = await profilesAddFavoritesService(profile_id, id);

  return res.status(201).json(favorites);
};

export const profilesListFavoritesController = async (
  req: Request,
  res: Response
) => {
  const { profile_id } = req.user;

  const list = await profilesListFavoritesService(profile_id);

  return res.status(200).json(list);
};
