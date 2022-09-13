import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (id: string) => {
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
      throw new AppError("Inactive user", 400);
    }
  } else {
    throw new AppError("User not found", 404);
  }

  await userRepository.save(user);
};

export default deleteUserService;
