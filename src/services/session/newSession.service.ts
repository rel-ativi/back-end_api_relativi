import { compare } from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces/users";

import AppDataSource from "../../data-source";

const newSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { email: email } });

  if (!user) {
    throw new AppError("Invalid credentials", 403);
  }

  if (!user.is_active) {
    throw new AppError("User is not active");
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign(
    {
      is_adm: user.is_adm,
      is_active: user.is_active,
      is_pro_user: user.is_pro_user,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "2h",
    }
  );

  return token;
};

export default newSessionService;
