import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ISimpleResponse } from "../../interfaces/users";

const updateUserService = async (
  name: string,
  email: string,
  password: string,
  id: string
): Promise<ISimpleResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!name && !email && !password) {
    throw new AppError("Bad request", 400);
  }

  if (name) {
    await userRepository.save({
      id,
      name,
    });
  }

  if (email) {
    const exists = await userRepository.findOneBy({
      email,
    });

    if (exists) {
      throw new AppError("Bad request", 400);
    }

    await userRepository.save({
      id,
      email,
    });
  }

  if (password) {
    const hashPassword = await hash(password, 10);

    await userRepository.save({
      id,
      password: hashPassword,
    });
  }

  const response: ISimpleResponse = { message: "User update success" };
  return response;
};

export default updateUserService;
