import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ISimpleResponse } from "../../interfaces/users";

const updateUserService = async (
  name: string,
  email: string,
  id: string
): Promise<ISimpleResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const exists = await userRepository.findOneBy({
    email,
  });

  if ((!name && !email) || exists) {
    throw new AppError("Bad request", 400);
  }

  if (name) {
    await userRepository.save({
      id,
      name,
    });
  }

  if (email) {
    await userRepository.save({
      id,
      email,
    });
  }

  const response: ISimpleResponse = { message: "User update success" };
  return response;
};

export default updateUserService;
