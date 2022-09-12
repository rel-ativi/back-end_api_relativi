import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { IUserCompleteResponse, IUserResponse } from "../../interfaces/users";

const listUserService = async (id: string): Promise<IUserCompleteResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const returnUser: IUserCompleteResponse = { ...user };
  delete returnUser.password;
  return returnUser;
};

export default listUserService;
