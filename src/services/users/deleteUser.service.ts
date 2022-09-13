import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ISimpleResponse } from "../../interfaces/users";

const deleteUserService = async (id: string): Promise<ISimpleResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id,
    },
  });

  if (user) {
    if (user.is_active) {
      user.is_active = false;
    } else {
      throw new AppError("bad request", 400);
    }
  } else {
    throw new AppError("user not found", 404);
  }

  await userRepository.save(user);

  const response = { message: "user delete success" };
  return response;
};

export default deleteUserService;
