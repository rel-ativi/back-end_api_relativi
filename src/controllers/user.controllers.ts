import { Request, Response } from "express";
import { IUserRequest } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUser.service";
import listUsersService from "../services/users/listUsers.service";

const createUserController = async (req: Request, res: Response) => {
  const {
    email,
    is_adm,
    name,
    password,
    is_pro_user,
    bio,
    phone,
  }: IUserRequest = req.body;
  const user = await createUserService({
    email,
    is_adm,
    name,
    password,
    is_pro_user,
    bio,
    phone,
  });
  return res.status(201).json(user);
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
};

const listUserController = async (req: Request, res: Response) => {
  const user = await listUserService(req.user.id);
  return res.json(user);
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await deleteUserService(id);
  return res.status(200).json(response);
};

export {
  createUserController,
  listUsersController,
  deleteUserController,
  listUserController,
};
