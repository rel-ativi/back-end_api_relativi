import AppDataSource from "../../data-source";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { User } from "../../entities/users.entity";
import { IUserRequest, IUserResponse } from "../../interfaces/users";

const createUserService = async ({
  email,
  is_adm,
  name,
  password,
  is_pro_user,
}: IUserRequest): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const exists = await userRepository.findOneBy({
    email,
  });

  if (!password) {
    throw new AppError("Password is a required field");
  }

  if (exists) {
    throw new AppError("Bad request", 400);
  }
  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    is_adm,
    password: hashedPassword,
    is_active: true,
    is_pro_user,
  });

  await userRepository.save(user);
  const returnUser: IUserResponse = { ...user };
  delete returnUser.password;

  return returnUser;
};

export default createUserService;
