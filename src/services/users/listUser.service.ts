import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const listUserService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default listUserService;
