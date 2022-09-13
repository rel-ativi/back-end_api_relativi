import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const { email, is_adm, name, password, is_pro_user }: IUserRequest = req.body;
  const user = await createUserService({
    email,
    is_adm,
    name,
    password,
    is_pro_user,
  });
  return res.status(201).json(user);
};

export const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(instanceToPlain(users));
};

export const listUserController = async (req: Request, res: Response) => {
  const user = await listUserService(req.user.id);
  return res.json(instanceToPlain(user));
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteUserService(id);
  return res.status(204);
};

export const updateUserController = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const update = await updateUserService(name, email, req.user.id);
  return res.status(200).json(update);
};
